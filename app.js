require("dotenv").config(); //trae la config del .env

const Server = require("./models/server");

const server = new Server(); //instancia del servidor

server.listenPort();
