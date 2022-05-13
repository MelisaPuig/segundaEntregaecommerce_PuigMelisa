const mongoose = require("mongoose");

const ContenedorMongo = require("../../contenedores/contenedorMongo");

class CarritosDAOMongo extends ContenedorMongo {
  constructor() {
    super();
  }

  async desconectar() {
    return mongoose.connection.close();
  }
}

module.exports = CarritosDAOMongo;
