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

/*"title": "Oculus VR",
  "description": "Equipo Oculus VR de Sony para Realidad Virtual",
  "code": "OCVR",
  "price": 200000,
  "status": true,
  "stock": 5,
  "category": "VR",
  "thumbnail": "Sin imagen"
  */


  /*
{
    "title": "Nintendo Switch",
    "description": "Consola Switch de Nintendo. Color blanco. Capacidad de almacenamiento de 1 TB. Incluye consola portátil, estuche portátil y 2 controles",
    "price": 200000,
    "thumbnail": "Sin imagen",
    "code": "SWI",
    "stock": 30,
    "id": 10
  }
*/