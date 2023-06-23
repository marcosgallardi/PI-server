const { Temperament } = require("../../src/db.js");
const { expect } = require("chai");

describe("Temperament model", () => {
 describe("Validators", () => {
  

    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Temperament.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when it's a valid name", () => {
        return Temperament.create({ name: "friendly" });
      });
    });
  });
});
