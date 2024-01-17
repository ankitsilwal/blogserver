import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import mongoose from "mongoose";
import * as request from "supertest";
describe("USERS(e2e)-TESTING", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  // GET ALL USERS------------------------------------------------------------------------------------------------

  it("(GET)-GET ALL USERS", async () => {
    return request(app.getHttpServer())
      .get("/users")
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeDefined();
      });
  });

  // GET USER BY ID-----------------------------------------------------------------------------------------------------

  it("(GET BY ID)- GET USER BY ID", async () => {
    const userId = "6564712d12617217693576e7";
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .then((res) => {
        expect(res.body.username).toBeDefined();
      });
  });

  // UPDATE USER BY ID------------------------------------------------------------------------------------------

  it("(PUT)- PUT BY ID", async () => {
    const updateUser = { username: "Vivek Doshi" };
    const userId = "6564712d12617217693576e7";
    return request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send(updateUser)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.username).toEqual(updateUser.username);
      });
  });

  // DELETE USER BY ID------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  it("(DELETE)-DELETE BY ID", async () => {
    const userId = "";
    const response = await request(app.getHttpServer()).delete(
      `/users/${userId}`
    );
    expect(response.status).toEqual(200);
  });
});
