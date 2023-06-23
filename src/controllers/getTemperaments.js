const axios = require("axios");
const { Temperament } = require("../db");

const dataTemperaments = async () => {
  let { data } = await axios.get("https://api.thedogapi.com/v1/breeds");
  let temperaments = data.map((breed) => breed.temperament);
  let temperamentArray = temperaments.join().split(",");
  let uniqueTemperaments = [...new Set(temperamentArray)];
  return uniqueTemperaments;
};

const uploadTemperaments = async () => {
  let temperaments = await dataTemperaments();
  let temperamentsArray = temperaments.map((t) => ({ name: t }));
  await Temperament.bulkCreate(temperamentsArray);
};

const getTemperaments = async () => {
  let temperaments = await Temperament.findAll();
  return temperaments;
};

module.exports = { uploadTemperaments, getTemperaments };
