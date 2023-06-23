const { Dog } = require("../db");

const postDogs = async ({
  image,
  id,
  name,
  anios,
  altura,
  peso,
  temperaments,
}) => {
  try {
    if (!id || !name || !anios || !altura || !peso || !temperaments || !image) {
      return "faltan datos";
    }
    let newDog = await Dog.create({ id, name, anios, altura, image, peso });
    await newDog.addTemperaments(temperaments);
    return newDog;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = postDogs;
