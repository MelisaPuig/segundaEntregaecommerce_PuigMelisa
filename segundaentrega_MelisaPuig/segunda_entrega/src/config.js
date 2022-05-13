const path = require("path");

module.exports = {
  /**
   * OLD.
   */
  USER_IS_ADMIN: true,

  /**
   * Database type.
   */
  DATABASE_TYPE: "firebase", // "memoria",  'archivos', 'mongodb', 'firebase',

  /**
   * Mongo config.
   */
  MONGO_CONFIG_URL: "mongodb://localhost:27017/ecommerce",
  MONGO_USER: "root",
  MONGO_PASSWORD: "root",

  /**
   * FireBase Config:
   */
  FIREBASE_CONFIG_PATH: path.join(__dirname, "firebase-config.json"),
};
