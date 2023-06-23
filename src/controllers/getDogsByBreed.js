require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const getImages = require("./getImage");

const getDogsByBreed = async (idRaza) => {
  try {
    if (idRaza >= 700)
      return await Dog.findByPk(idRaza, {
        include: [
          {
            model: Temperament,
          },
        ],
      });

    let { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${idRaza}`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    let aux = { ...data, image: await getImages(data.reference_image_id) };

    return aux;
  } catch (error) {
    throw error.message;
  }
};

module.exports = getDogsByBreed;
