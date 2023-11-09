const Services = require("../services/services");

exports.signUp = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const response = await Services.signUp(res, userName, password, email);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const response = await Services.login(res, password, email);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.services = async (req, res) => {
  try {
    const { serviceName } = req.body;

    const response = await Services.services(res, serviceName);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.getServices = async (req, res) => {
  try {
    const response = await Services.getServices(res);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.orders = async (req, res) => {
  try {
    const { serviceId, totalfee } = req.body;
    const { userId } = req.payload;
    const response = await Services.orders(res, serviceId, userId, totalfee);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.query;
    const response = await Services.getOrder(res, parseInt(orderId));
    return response;
  } catch (error) {
    throw error;
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { userId } = req.payload;
    const response = await Services.getAllOrders(res, userId);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId, totalfee, serviceId } = req.body;
    const { userId } = req.payload;
    const response = await Services.updateOrder(
      res,
      orderId,
      totalfee,
      serviceId,
      userId
    );
    return response;
  } catch (error) {
    throw error;
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const { userId } = req.payload;
    const response = await Services.deleteOrder(res, orderId, userId);
    return response;
  } catch (error) {
    throw error;
  }
};
