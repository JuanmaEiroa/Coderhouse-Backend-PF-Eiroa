// Proyecto Final - Preentrega 1

import express from "express"; //Importación de express para la generación del servidor.
import { productsRouter } from "./routers/products.router.js"; //Importación del Router de productos
import { cartsRouter } from "./routers/carts.router.js"; //Importación del Router de carts

//Creación del servidor en la constante app
const app = express(); 

//Uso de middleware para parsear los datos de la petición.
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//Uso de los middleware de routing para determinar las rutas a usar por la aplicación
app.use("/api/products", productsRouter); 
app.use("/api/carts", cartsRouter); 

app.listen(8080, () => {
  console.log("Listening in 8080"); //Check de que el servidor se encuentra funcionando en el puerto 8080.
});

//Code by Juan Manuel Eiroa :)
