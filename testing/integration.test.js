require("dotenv").config({ path: "../.env" });
var express = require("express");
// const jest = require("jest");
var request = require("supertest");
var routes = require("../routes/routes");
var app = express();
app.use(express.json());
const services = require("../services/services");
app.use("/v1/api", routes);
var token = "";

beforeAll(async () => {
  const { statusCode, body } = await request(app)
    .post("/v1/api/mock-signup")
    .send({
      //send method carrys what data your expecting
      userName: "damodar",
      email: "damodar@gmail.com",
      password: "password12356",
    });
  token = body.token;
});

describe("Integration Testing", () => {
  test("/mock-signup, user SUCCESSFULL signup", async () => {
    const { statusCode, body } = await request(app)
      .post("/v1/api/mock-signup")
      .send({
        //send method carrys what data your expecting
        userName: "damodar",
        email: "damodar@gmail.com",
        password: "password12356",
      });
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        userId: expect.any(Number),
        token: expect.any(String),
      })
    );
  });

  // test("/signup, user already exists ", async () => {
  //   const { statusCode, body } = await request(app)
  //     .post("/v1/api/signup")
  //     .send({
  //       //send method carrys what data your expecting
  //       userName: "damodar",
  //       email: "damodar@gmail.com",
  //       password: "password12356",
  //     });
  //   expect(statusCode).toBe(409);
  //   expect(body).toEqual(
  //     expect.objectContaining({
  //       message: expect.any(String),
  //     })
  //   );
  // });

  test("/login, user SUCCESSFULL login", async () => {
    const { statusCode, body } = await request(app).post("/v1/api/login").send({
      //send method carrys what data your expecting
      email: "damodar@gmail.com",
      password: "password12356",
    });
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.objectContaining({
          userId: expect.any(Number),
          token: expect.any(String),
        }),
      })
    );
  });
});

describe("/services,Data about services", () => {
  test("/services, Post service data", async () => {
    const { statusCode, body } = await request(app)
      .post("/v1/api/mock-services")
      .send({
        //send method carrys what data your expecting
        serviceName: "Integration2.0",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.objectContaining({
          serviceId: expect.any(Number),
          serviceName: expect.any(String),
        }),
      })
    );
  });

  test("/services, Get service data", async () => {
    const { statusCode, body } = await request(app).get("/v1/api/services");
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Array),
      })
    );
  });
});

describe("/orders , Data about orders", () => {
  test("/orders-list, get all orders data", async () => {
    const { statusCode, body } = await request(app)
      .get("/v1/api/orders-list")
      .set("Authorization", `Bearer ${token}`);
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Array),
      })
    );
  });

  test("/orders, get  order based on orderId data", async () => {
    const { statusCode, body } = await request(app)
      .get("/v1/api/orders")
      .query({ orderId: 1 })
      .set("Authorization", `Bearer ${token}`);
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.any(Object),
        //   expect.objectContaining({
        //     orderId: expect.any(Number),
        //     serviceId: expect.any(Number),
        //     userId: expect.any(Number),
        //     totalfee: expect.any(Number),
        //     datetime: expect.any(Date),
        //   }),
      })
    );
  });

  test("/orders, delete  order based on orderId data", async () => {
    const { statusCode, body } = await request(app)
      .delete("/v1/api/mock-orders")
      .send({ orderId: 2 })
      .set("Authorization", `Bearer ${token}`);
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  test("/orders, update  order based on orderId data", async () => {
    const { statusCode, body } = await request(app)
      .put("/v1/api/mock-orders")
      .send({ orderId: 1, totalfee: 900, serviceId: 4 })
      .set("Authorization", `Bearer ${token}`);
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
