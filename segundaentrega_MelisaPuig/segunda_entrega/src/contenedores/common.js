const PRODUCT_REQUIRED_PROPERTIES = [
  "nombre",
  "descripcion",
  "foto",
  "precio",
  "stock",
];

class ContenedorCommon {
  throwErrorIfInvalidProduct(product) {
    PRODUCT_REQUIRED_PROPERTIES.forEach((requiredProperty) => {
      if (typeof product[requiredProperty] === "undefined") {
        throw new Error(
          `El producto debe tener la propiedad ${requiredProperty}.`
        );
      }
    });
  }
}

module.exports = new ContenedorCommon();
