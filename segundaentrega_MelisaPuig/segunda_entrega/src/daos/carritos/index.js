const config = require("../../config");
const CarritosDAOArchivo = require("./CarritosDAOArchivo");
const CarritosDAOMemoria = require("./CarritosDAOMemoria");
const CarritosDAOMongo = require("./CarritosDAOMongo");
const CarritosDAOFirebase = require("./CarritosDAOFirebase");

module.exports = function getDAO() {
  switch (config.DATABASE_TYPE) {
    case "memoria":
      return new CarritosDAOMemoria();
    case "archivos":
      return new CarritosDAOArchivo();
    case "mongodb":
      return new CarritosDAOMongo();
    case "firebase":
      return new CarritosDAOFirebase();
    default:
      throw new Error(
        `No se reconocó el tipo de base de datos: ${config.DATABASE_TYPE}.`
      );
  }
};
