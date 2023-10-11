//Importaciones
import { Server } from "socket.io";
import express from "express";
import { appConfig } from "../config/env.config.js";

//Definición del puerto
const PORT = appConfig.port || 8080;

//Montaje del servidor en express y el socket para permitir exportar el socket a otros módulos.
const app = express();
const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
const io = new Server(httpServer);

export {app, io};