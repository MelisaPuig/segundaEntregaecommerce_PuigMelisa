const contenedorCommon = require("../common");
const mongoModel = require("./model");

class ContenedorMongo {
  async exists(id) {
    try {
      const searched = await this.getById(id);
      return searched !== null;
    } catch (error) {
      throw error;
    }
  }

  async save(newProduct) {
    try {
      contenedorCommon.throwErrorIfInvalidProduct(newProduct);
      newProduct.timestamp = new Date();
      newProduct.codigo = Math.random().toString(36);
      let productId = 0;
      const products = await this.getAll();
      if (products.length > 0) {
        const ids = products.map((e) => e.id);
        productId = Math.max(...ids);
        if (Number.isNaN(productId)) {
          productId = 1;
        }
      }
      newProduct.id = productId + 1;
      const mongoNewProduct = new mongoModel(newProduct);
      const result = await mongoNewProduct.save();
      return result;
    } catch (error) {
      throw new Error(`Ha ocurrido un error agregando el contenido: ${error}`);
    }
  }

  async getById(id) {
    try {
      const searchedFound = await mongoModel.findOne({ id }).lean();
      if (!searchedFound) {
        return null;
      }
      return searchedFound;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return mongoModel.find().lean();
    } catch (error) {
      throw error;
    }
  }

  async update(id, productData) {
    try {
      contenedorCommon.throwErrorIfInvalidProduct(productData);
      const existingEntry = await this.exists(id);
      if (!existingEntry) {
        throw new Error(`No existe la entrada con el Id: ${id}`);
      }
      const result = await mongoModel.updateOne({ id }, { $set: productData });
      return this.getById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      await mongoModel.findOneAndDelete({ id });
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await mongoModel.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContenedorMongo;
