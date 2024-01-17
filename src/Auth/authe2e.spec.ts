import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";

describe("AuthController (e2e)", () => {
  let app;
  let accessToken: string = "";

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const newBlog = {
    blogname: "My 23 Blog",
    genre: "Lofi",
    description: "This is a test blog",
    problem: "Hungerness",
    summary: "Emptyyyyyyyy",
  };

  it("/auth/signup (POST)", () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        username: "testuser11",
        password: "testpassword",
        role: "user",
        pnumber: 1234567890,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
  });

  it("/auth/signin (POST)", () => {
    return request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        username: "testuser",
        password: "testpassword",
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
        accessToken = res.body.accessToken;
      });
  });

  describe("Blog", () => {
    let blogId: string;
    it("(POST) - Create a new Blog", async () => {
      return request(app.getHttpServer())
        .post("/blog")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(newBlog)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.blogname).toEqual(newBlog.blogname);
          blogId = res.body.id;
        });
    });

    it("(GET) - GET ALL BLOGS", async () => {
      return request(app.getHttpServer())
        .get("/blog")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeDefined();
        });
    });

    it("(GET BY ID)-GET BLOG BY ID", async () => {
      return request(app.getHttpServer())
        .get(`/blog/${blogId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body.blogname).toBeDefined();
        });
    });

    it("(PUT) - Update Blog By ID", async () => {
      const updateBlog = { blogname: "Vivek" };

      return request(app.getHttpServer())
        .put(`/blog/${blogId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(updateBlog)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.blogname).toEqual(updateBlog.blogname);
        });
    });

    it("(DELETE)- DELETE BY ID", async () => {
      const res = await request(app.getHttpServer())
        .delete(`/blog/${blogId}`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(res.status).toEqual(200);
    });
  });
});
