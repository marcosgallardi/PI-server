require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const getImages = async (id) => {
  const { data } = await axios.get(
    `https://api.thedogapi.com/v1/images/${id}`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
  const { url } = data;

  return url;
};

module.exports = getImages;
