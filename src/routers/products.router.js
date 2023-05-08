import { Router } from "express";
import ProductManager from "../models/ProductManager.js"; // Importación del productManager previamente creado para la creación y obtención de productos

const productManager = new ProductManager("./products.json"); //Creación de una nueva instancia del productManager, usando como ruta ./products.json para la creación del archivo de productos.
const productsRouter = Router(); //Asignación del middleware Router para la creación de rutas

productsRouter.get("/", async (req, res) => {
  //Endpoint para mostrar productos
  let productList = await productManager.getProducts(); //Se obtiene el array de productos.
  let productLimit = req.query.limit; //Se obtiene el límite de productos (en caso de haber sido definido) a mostrar.
  if (productLimit) {
    res.send(await productList.slice(0, productLimit)); //En caso de definir un límite de productos como req.query, se mostrarán esa cantidad
  } else {
    res.send(productList); // En caso de que no se defina un req.query, se mostrarán todos los productos de la lista.
  }
});

productsRouter.get("/:id", async (req, res) => {
  //Endpoint para obtener un producto según un id, indicándolo como req.param
  try {
    let productFound = await productManager.getProductById(
      parseInt(req.params.id)
    );
    if (productFound != undefined) {
      res.send(productFound); //Si el id existe, se muestra el producto que se buscaba
    } else {
      res.status(400).send(`No existe ese ID`); //Si el id no existe, se muestra un error
    }
  } catch (err) {
    res.status(400).send(`Hubo un error al buscar por ID: ${err}`);
  }
});

export {productsRouter};