const config = require("../../config");
const ProductosDAOArchivo = require("./ProductosDAOArchivo");
const ProductosDAOMemoria = require("./ProductosDAOMemoria");
const ProductosDAOMongo = require("./ProductosDAOMongo");
const ProductosDAOFirebase = require("./ProductosDAOFirebase");

module.exports = function getDAO() {
  switch (config.DATABASE_TYPE) {
    case "memoria":
      return new ProductosDAOMemoria();
    case "archivos":
      return new ProductosDAOArchivo();
    case "mongodb":
      return new ProductosDAOMongo();
    case "firebase":
      return new ProductosDAOFirebase();
    default:
      throw new Error(
        `No se reconocó el tipo de base de datos: ${config.DATABASE_TYPE}.`
      );
  }
};
