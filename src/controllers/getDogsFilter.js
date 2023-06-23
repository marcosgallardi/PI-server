const { Dog } = require("../db");
const getDogs = require("./getDogs");

const getDogsFilter = async (q) => {
  try {
    let dogsDB = await Dog.findOne({ where: { name: q } });
    let dogsApi = await getDogs();

    let filterDogs = dogsApi.filter((perro) => {
      return perro.name.toLowerCase().includes(q);
    });

    if (!filterDogs) {
      return dogsDB;
    }
    return filterDogs;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getDogsFilter;
