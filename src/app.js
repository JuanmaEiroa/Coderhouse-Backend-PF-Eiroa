// Proyecto Final - Preentrega 1

import express from "express"; //Importación de express para la generación del servidor.
import { productsRouter } from "./routers/products.router.js"; //Importación del Router de productos

const app = express(); //Creación del servidor en la constante app

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Uso de middleware para parsear los datos de la petición.

app.use("/api/products", productsRouter);

app.listen(8080, () => {
  console.log("Listening in 8080"); //Check de que el servidor se encuentra funcionando en el puerto 8080.
});

//Code by Juan Manuel Eiroa :)
