const { query, body, check, validationResult } = require("express-validator");

exports.signUp = [
  check("userName").notEmpty().withMessage("userName required"),
  check("email").notEmpty().withMessage("Email is required"),
  check("password").notEmpty().withMessage("password is required"),
];

exports.login = [
  check("email").notEmpty().withMessage("Email is required"),
  check("password").notEmpty().withMessage("password is required"),
];

exports.services = [
  check("serviceName").notEmpty().withMessage("serviceName is required"),
];

exports.getOrder = [
  query("orderId").notEmpty().withMessage("orderId is required"),
];

exports.order = [
  check("serviceId").notEmpty().withMessage("serviceId is required"),
  check("totalfee").notEmpty().withMessage("totalfee is required"),
];

exports.updateOrder = [
  check("serviceId").notEmpty().withMessage("serviceId is required"),
  check("totalfee").notEmpty().withMessage("totalfee is required"),
  check("orderId").notEmpty().withMessage("orderId is required"),
];

exports.deleteOrder = [
  check("orderId").notEmpty().withMessage("serviceId is required"),
];

exports.validator = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({
        statusCode: 400, //bad request
        errors: validationResult(req)
          .array()
          .map((e) => e.msg)
          .join(", "),
        location: errors.errors[0].location,
      });
    } else {
      next();
    }
  } catch (error) {}
};
