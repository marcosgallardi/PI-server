require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog } = require("../db");
const { Temperament } = require("../db");

const getDogs = async () => {
  let { data } = await axios.get("https://api.thedogapi.com/v1/breeds", {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  let dogsDB = await Dog.findAll({
    include: [
      {
        model: Temperament,
      },
    ],
  });

  let aux = dogsDB.map((dog) => {
    let temperamentos = dog.Temperaments.map((t) => t.name);
    return {
      id: dog.id,
      name: dog.name,
      image: dog.image,
      height: dog.altura,
      weight: dog.peso,
      life_span: dog.anios,
      temperament: temperamentos,
    };
  });

  data = data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      image: dog.image.url,
      temperament: dog.temperament,
      origin: dog.origin,
      weight: dog.weight.metric,
      height: dog.height.metric,
      life_span: dog.life_span,
    };
  });

  data = [...data, ...aux];

  return data;
};

module.exports = getDogs;
