const admin = require("firebase-admin");

const ContenedorFirebase = require("../../contenedores/contenedorFirebase");

class ProductosDAOFirebase extends ContenedorFirebase {
  constructor() {
    super();
  }

  async desconectar() {
    return admin.database().goOffline();
  }
}

module.exports = ProductosDAOFirebase;
