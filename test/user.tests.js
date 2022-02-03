const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
/**
 * Adding End to End tests as API responses and header checks are not a part of service i.e. units
 * those are extra layers managed by middlewares
 */
const { expect } = chai;
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJuZXdAZW1haWwuY29tIiwiaWF0IjoxNjQyMzUxMDgzLCJleHAiOjE2NDI2MTAyODN9.E_RNmyKH4aN4qvaTup7C79mP-b5kT9L35jPRwEs1wwo";

chai.use(chaiHttp);
describe("User E2E Tests!", () => {
  //Get single User /user:id
  it("should be able to retrieve my user entity", (done) => {
    chai
      .request(app)
      .get("/users/3")
      .set("Authorization", "Bearer " + validToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.id).to.equals(1);
        expect(res.body.email).to.equals("new2@email.com");
        done();
      });
  });

  it("should not be able to retrieve a different user entity and return appropriate error code", (done) => {
    chai
      .request(app)
      .get("/users/2")
      .set("Authorization", "Bearer " + validToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it("should not be able to retrieve an entity if not authenticated and return appropriate error code", (done) => {
    chai
      .request(app)
      .get("/users/2")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  //Get all Users /
  it("should be able to retrieve all users without auth", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  // Login with correct creds /login
  it("should be able to login with correct creds", (done) => {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email: "new@email.com",
        password: "12345",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.username).to.equals("Email");
        done();
      });
  });

  it("should NOT be able to login with incorrect creds", (done) => {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email: "new@email.com",
        password: "1234567",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should be able to add user with valid token", (done) => {
    chai
      .request(app)
      .post("/users/")
      .set("Authorization", "Bearer " + validToken)
      .send({
        email: "test@email.com",
        name: "Test",
        username: "User",
        phone: "123456",
        wesbite: "www.web.com",
        password: "123456",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.email).to.equals("test@email.com");
        expect(res.body.username).to.equals("Test");
        done();
      });
  });

  it("should NOT be able to add user with invalid token", (done) => {
    chai
      .request(app)
      .post("/users/")
      .set("Authorization", "Bearer " + validToken + "KLSKALSKSKLAS")
      .send({
        email: "test@email.com",
        name: "Test",
        username: "User",
        phone: "123456",
        wesbite: "www.web.com",
        password: "123456",
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
