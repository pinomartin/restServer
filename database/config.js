const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos Online :) !");
  } catch (error) {
    console.log(error);
    throw new Error("Error en inicialización de Base de datos");
  }
};

module.exports = {
  dbConnection,
};
