const { default: mongoose } = require("mongoose");
const CONFIG = require("../config");
const { MONGO_CONFIG_URL, MONGO_PASSWORD, MONGO_USER } = CONFIG;

class MongoDB {
  async connect() {
    try {
      console.log([MONGO_USER, MONGO_PASSWORD]);
      await mongoose.connect(MONGO_CONFIG_URL, {
        authSource: "admin",
        user: MONGO_USER,
        pass: MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Mongoose connectd");
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MongoDB();
