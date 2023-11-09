const authentication = require("../middleware/authentication");
const connection = require("../config/dbConfig");
exports.signUp = async (res, userName, password, email) => {
  try {
    const userExist = (
      await connection.execute(`SELECT * FROM users WHERE email=?`, [email])
    )[0];
    if (userExist.length) {
      return res.status(409).json({
        message: "User alread exists.",
      });
    }

    const [rows, fields] = await connection.execute(
      "INSERT INTO users (userName,email,password) VALUES (?,?,?)",
      [userName, email, password]
    );

    const row = (
      await connection.execute(`SELECT * FROM users WHERE userId=?`, [
        rows.insertId,
      ])
    )[0];

    if (row.length) {
      const token = await authentication.createToken(row[0]);
      return res.status(200).json({
        message: "user signup successfull",
        userId: rows.insertId,
        token: token,
      });
    }
  } catch (error) {
    console.log(`Error at signUp process...............`, error);
  }
};

exports.login = async (res, password, email) => {
  try {
    const userExist = (
      await connection.execute(
        `SELECT * FROM users WHERE email=? AND password=?`,
        [email, password]
      )
    )[0];
    if (!userExist.length) {
      return res.status(300).json({
        message: "User not found",
      });
    } else {
      const token = await authentication.createToken(userExist[0]);
      return res.status(200).json({
        message: "User logged successfully",
        data: {
          userId: userExist[0].userId,
          token: token,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.services = async (res, serviceName) => {
  try {
    const serviceExists = (
      await connection.execute(`SELECT * FROM services WHERE serviceName=?`, [
        serviceName,
      ])
    )[0];
    if (serviceExists.length) {
      return res.status(409).json({
        message: "service exists",
      });
    }
    const [rows, fields] = await connection.execute(
      "INSERT INTO services (serviceName) VALUES (?)",
      [serviceName]
    );
    const row = (
      await connection.execute(
        `SELECT serviceId,serviceName FROM services WHERE serviceId=?`,
        [rows.insertId]
      )
    )[0];

    if (row.length) {
      return res.status(200).json({
        message: "Service created successfull",
        data: {
          serviceId: rows.insertId,
          serviceName: row[0].serviceName,
        },
      });
    } else {
      return res.status(409).json({
        message: "Service Cannot create at this movement",
        data: [],
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.getServices = async (res) => {
  try {
    const row = (
      await connection.execute(
        `SELECT serviceId,serviceName FROM services WHERE isActive=?`,
        [1]
      )
    )[0];

    return res.status(200).json({
      message: "Service Fetched successfull",
      data: row.length ? row : [],
    });
  } catch (error) {
    throw error;
  }
};

exports.orders = async (res, serviceId, userId, totalfee) => {
  try {
    const orderExists = (
      await connection.execute(
        `SELECT created_at as datetime FROM orders WHERE serviceId=? AND userId=? AND isActive=?`,
        [serviceId, userId, 1]
      )
    )[0];

    if (orderExists.length) {
      const date1 = new Date();
      const date2 = new Date(orderExists[0].datetime);
      const timeDifference = date2 - date1;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      if (hoursDifference < 3) {
        return res.status(409).json({
          message: "order already exists.Please create new order after 3 hours",
        });
      }
    }
    const [rows, fields] = await connection.execute(
      "INSERT INTO orders (serviceId,userId,totalfee) VALUES (? , ? , ?)",
      [serviceId, userId, totalfee]
    );
    const row = (
      await connection.execute(
        `SELECT orderId,serviceId , userId,totalfee,created_at as datetime FROM orders WHERE orderId=?`,
        [rows.insertId]
      )
    )[0];

    if (row.length) {
      return res.status(200).json({
        message: "order created successfull",
        data: row[0],
      });
    } else {
      return res.status(409).json({
        message: "Order Cannot create at this movement",
        data: [],
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.getOrder = async (res, orderId) => {
  try {
    const row = (
      await connection.execute(
        `SELECT orderId,serviceId , userId,totalfee,created_at as datetime FROM orders WHERE orderId=? AND isActive=?`,
        [orderId, 1]
      )
    )[0];

    return res.status(200).json({
      message: "order fetched successfully",
      data: row.length ? row[0] : [],
    });
  } catch (error) {
    throw error;
  }
};

exports.getAllOrders = async (res, userId) => {
  try {
    const row = (
      await connection.execute(
        `SELECT orderId,serviceId , userId,totalfee,created_at as datetime FROM orders WHERE userId=? AND isActive=?`,
        [userId, 1]
      )
    )[0];

    return res.status(200).json({
      message: "order fetched successfull",
      data: row.length ? row : [],
    });
  } catch (error) {
    throw error;
  }
};

exports.updateOrder = async (res, orderId, totalfee, serviceId, userId) => {
  try {
    const orderExists = (
      await connection.execute(
        `SELECT created_at as datetime FROM orders WHERE orderId=? AND userId=? AND isActive=?`,
        [orderId, userId, 1]
      )
    )[0];
    if (!orderExists.length) {
      return res.status(422).json({
        //cant process the request
        message: "Order doesn't exists",
      });
    } else {
      const date1 = new Date();
      const date2 = new Date(orderExists[0].datetime);
      const timeDifference = date1 - date2;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      if (hoursDifference < 3) {
        return res.status(409).json({
          message: "Order cannot update at this movement",
        });
      }
    }
    const [result] = await connection.execute(
      `UPDATE orders SET totalfee=? , serviceId=? WHERE orderId=?`,
      [totalfee, serviceId, orderId]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Updated successfully",
      });
    } else {
      return res.status(422).json({
        //Unprocessable entity It helps to distinguish between a "Bad request"
        message: "No rows were updated.Please try after sometime",
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteOrder = async (res, orderId, userId) => {
  try {
    const orderExists = (
      await connection.execute(
        `SELECT created_at as datetime FROM orders WHERE orderId=? AND userId=? AND isActive=?`,
        [orderId, userId, 1]
      )
    )[0];

    if (!orderExists.length) {
      return res.status(422).status({
        message: "Order doesn't exists",
      });
    }

    const [result] = await connection.execute(
      `UPDATE orders SET isActive=? WHERE orderId=? AND userId=?`,
      [0, orderId, userId]
    );
    if (result.affectedRows > 0) {
      return res.status(200).json({
        statusCode: 200,
        message: "Row deleted successfully",
      });
    } else {
      return res.status(200).json({
        //Unprocessable entity It helps to distinguish between a "Bad request"
        message: "No rows were deleted.Please try after sometime",
      });
    }
  } catch (error) {
    throw error;
  }
};
