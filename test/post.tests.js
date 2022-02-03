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
  it("should be able to retrieve Post when auth", (done) => {
    chai
      .request(app)
      .get("/posts/1")
      .set("Authorization", "Bearer " + validToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.title).to.equals("Test Post");
        expect(res.body.body).to.equals("www.web.com");
        done();
      });
  });

  it("should not be able to retrieve a Post if not authenticated and return appropriate error code", (done) => {
    chai
      .request(app)
      .get("/posts/2")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  //Get all POSTS /
  it("should be able to retrieve all posts without auth", (done) => {
    chai
      .request(app)
      .get("/posts")
      .set("Authorization", "Bearer " + validToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should be able to add post with valid token", (done) => {
    chai
      .request(app)
      .post("/posts")
      .set("Authorization", "Bearer " + validToken)
      .send({
        title: "Test Post",
        body: "Testing Post Addition 1234",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.title).to.equals("Test Post");
        expect(res.body.body).to.equals("Testing Post Addition 1234");
        done();
      });
  });

  it("should be able to UPDATE post with valid token", (done) => {
    chai
      .request(app)
      .put("/posts/2")
      .set("Authorization", "Bearer " + validToken)
      .send({
        title: "Test Post Edited",
        body: "Testing Post Addition 1234 EDITED",
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should NOT be able to add post with invalid token", (done) => {
    chai
      .request(app)
      .post("/posts")
      .set("Authorization", "Bearer " + validToken + "KLSKALSKSKLAS")
      .send({
        title: "Test Post",
        body: "www.web.com",
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
