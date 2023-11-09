const { Router } = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const Validation = require("../middleware/validator");
const route = Router();

route.post(
  "/signup",
  Validation.signUp,
  Validation.validator,
  Controller.signUp
);

route.post("/login", Validation.login, Validation.validator, Controller.login);

route.post(
  "/services",
  Validation.services,
  Validation.validator,
  authentication.verifyToken,
  Controller.services
);

route.get("/services", Controller.getServices);

route.post(
  "/orders",
  Validation.order,
  Validation.validator,
  authentication.verifyToken,
  Controller.orders
);

route.get(
  "/orders",
  Validation.getOrder,
  Validation.validator,
  authentication.verifyToken,
  Controller.getOrder
);

route.get("/orders-list", authentication.verifyToken, Controller.getAllOrders);

route.put(
  "/orders",
  Validation.updateOrder,
  Validation.validator,
  authentication.verifyToken,
  Controller.updateOrder
);

route.delete(
  "/orders",
  Validation.deleteOrder,
  Validation.validator,
  authentication.verifyToken,
  Controller.deleteOrder
);

// -----------------------------Mock APIS---------------------------------------------

const Mock = require("../mockImplementation/mockImplementation");

route.post("/mock-signup", Mock.signUp);

route.put("/mock-orders", Mock.signUp);

route.delete("/mock-orders", Mock.deleteOrder);

route.post("/mock-services", Mock.services);

module.exports = route;
