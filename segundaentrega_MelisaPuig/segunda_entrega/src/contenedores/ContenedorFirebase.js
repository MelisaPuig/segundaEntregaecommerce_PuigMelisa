const admin = require("firebase-admin");

const contenedorCommon = require("./common");
const CONFIG = require("../config");

const serviceAccount = require(CONFIG.FIREBASE_CONFIG_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const query = db.collection("productos");

class ContenedorFirebase {
  async exists(id) {
    try {
      const entry = await this.getById(id);
      return entry !== null;
    } catch (error) {
      throw error;
    }
  }

  async save(newProduct) {
    try {
      contenedorCommon.throwErrorIfInvalidProduct(newProduct);
      newProduct.timestamp = new Date();
      newProduct.codigo = Math.random().toString(36);

      const entries = await this.getAll();
      let newProductId = 1;
      if (entries.length > 0) {
        const entryIds = entries.map((e) => e.id);
        const maxId = Math.max(...entryIds);
        newProductId = maxId + 1;
      }
      newProduct.id = newProductId;
      const doc = query.doc(`${newProductId}`);
      await doc.create(newProduct);
      return this.getById(newProductId);
    } catch (error) {
      throw new Error(`Ha ocurrido un error agregando el contenido: ${error}`);
    }
  }

  async getById(id) {
    try {
      const entry = query.doc(`${id}`);
      const entryData = await entry.get();
      if (!entryData) {
        return null;
      }
      return entryData.data();
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const entries = (await query.get()).docs;
      if (!entries) {
        return [];
      }
      return entries.map(this._parseEntry);
    } catch (error) {
      throw error;
    }
  }

  async update(id, productData) {
    try {
      contenedorCommon.throwErrorIfInvalidProduct(productData);
      const exists = await this.exists(id);
      if (!exists) {
        throw new Error(`No existe la entrada con el Id: ${id}`);
      }
      const entry = query.doc(`${id}`);
      await entry.update(productData);
      return this.getById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const entry = query.doc(`${id}`);
      await entry.delete();
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      const allEntries = await this.getAll();
      const ids = allEntries.map((e) => e.id);
      const promises = ids.map((e) => this.deleteById(e));
      await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }

  /**
   * PRIVATE METHODS.
   */
  _parseEntry(entry) {
    const entryData = entry.data();
    entryData.id = entry.id;
    return entryData;
  }
}

module.exports = ContenedorFirebase;
