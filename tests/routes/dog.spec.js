const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app"); // Supongamos que tu archivo principal de la aplicación se llama "app.js"

describe("GET /dogs", () => {
  it("should return a list of dogs", (done) => {
    request(app)
      .get("/dogs")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});

describe("GET /dogs/:idRaza", () => {
  it("should return an error if the breed ID is not a number", (done) => {
    const invalidBreedId = "abc"; // Coloca aquí un valor de ID de raza inválido (no es un número)
    request(app)
      .get(`/dogs/${invalidBreedId}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("error.message");

        done();
      });
  });
});
