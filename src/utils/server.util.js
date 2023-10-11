//Importaciones
import { Server } from "socket.io";
import express from "express";
import { appConfig } from "../config/env.config.js";

//Definición del puerto
const PORT = appConfig.port;
const HOST = appConfig.host;

//Montaje del servidor en express y el socket para permitir exportar el socket a otros módulos.
const app = express();
const httpServer = app.listen(PORT, HOST, () => {
  console.log(`Listening now on port ${PORT}`);
});
const io = new Server(httpServer);

export { app, io };
