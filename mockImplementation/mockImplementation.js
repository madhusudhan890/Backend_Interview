const authentication = require("../middleware/authentication");

exports.signUp = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    let body = {
      userId: 1,
      email: email,
    };
    const token = await authentication.createToken(body);
    return res.status(200).json({
      message: "user signup successfull",
      userId: body.userId,
      token: token,
    });
  } catch (error) {
    console.log(`Error at signUp process...............`, error);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId, totalfee, serviceId, userId = 1 } = req.body;
    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    throw error;
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId, userId = 1 } = req.body;
    return res.status(200).json({
      statusCode: 200,
      message: "Row deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};

exports.services = async (req, res) => {
  try {
    const { serviceName } = req.body;
    return res.status(200).json({
      message: "Service created successfull",
      data: {
        serviceId: 1,
        serviceName: serviceName,
      },
    });
  } catch (error) {
    throw error;
  }
};
