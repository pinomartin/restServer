const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/users";
    this.authPath = "/api/auth";

    //Conexion BD
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Rutas de la app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico donde esta HTML
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth")); //indicando el path , no es necesario llamar al path en c/u de las routes
    this.app.use(this.usuariosPath, require("../routes/user")); //indicando el path , no es necesario llamar al path en c/u de las routes
  }

  listenPort() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo en puerto", this.port);
    }); //llama a la variable de entorno PORT
  }
}

module.exports = Server;
