import { Router } from "express";
import CartsManager from "../models/CartsManager.js"; // Importación del productManager previamente creado para la creación y obtención de productos

const cartsManager = new CartsManager("./carts.json");
const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = {"products":[]};
    res.status(201).send(await cartsManager.addCart(cart));
  } catch (err) {
    res.status(400).send(`Hubo un error al agregar el carrito: ${err}`);
  }
});

cartsRouter.get("/", async (req, res) => {
  try {
    res.send(await cartsManager.getCarts());
  } catch (err) {
    res.status(400).send(`Hubo un error al obtener los carritos: ${err}`);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    let cartFound = await cartsManager.getCartById(
      parseInt(req.params.cid) //Método para obtener un carrito según un id, indicándolo como req.param
    );
    if (cartFound != undefined) {
      res.send(cartFound); //Si el id existe, se muestra el carrito que se buscaba
    } else {
      res.status(400).send(`No existe ese ID`); //Si el id no existe, se muestra un error
    }
  } catch (err) {
    res.status(400).send(`Hubo un error al buscar por ID: ${err}`);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await cartsManager.addProdtoCart(
          parseInt(req.params.cid),
          parseInt(req.params.pid)
        )
      );
  } catch (err) {
    res
      .status(400)
      .send(`Hubo un error al agregar el producto al carrito por ID: ${err}`);
  }
});

export { cartsRouter };
