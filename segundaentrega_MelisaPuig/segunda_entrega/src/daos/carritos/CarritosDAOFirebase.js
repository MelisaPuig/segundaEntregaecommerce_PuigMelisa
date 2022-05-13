const admin = require("firebase-admin");

const ContenedorFirebase = require("../../contenedores/contenedorFirebase");

class CarritosDAOFirebase extends ContenedorFirebase {
  constructor() {
    super();
  }

  async desconectar() {
    return admin.database().goOffline();
  }
}

module.exports = CarritosDAOFirebase;
