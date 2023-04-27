// const mongoose = require("mongoose");
// const request = require("supertest");

// const app = require("../../app");

// const { User } = require("../../models/user");

// const { DB_HOST_TEST, PORT } = process.env;

// ответ должен иметь статус-код 200

// в ответе должен возвращаться токен

// в ответе должен возвращаться объект user
// с 2 полями email и subscription, имеющие тип данных String

// const loginData = {
//   email: "test1@gmail.com",
//   password: "123456",
// };

// let token = null;

// describe("test /api/auth/login route", () => {
//   let server = null;
//   beforeAll(async () => {
//     server = app.listen(PORT);
//     await mongoose.connect(DB_HOST_TEST);
//     console.log("Подключиличь к базе");
//   });

//   afterAll(async () => {
//     server.close();
//     await mongoose.connection.close();
//   });

//   beforeEach(async () => {
//     const res = await request(app).post("api/auth/register").send(loginData);
//     console.log(res);
//     token = JSON.parse(res).token;
//   });

//   afterEach(async () => {
//     await User.deleteMany({});
//   });

//   test("test login route with correct status", async () => {
//     const res = await request(app)
//       .post("api/auth/login")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(201);
//   });
// });
