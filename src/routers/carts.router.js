import { Router } from "express";
import CartsManager from "../models/CartsManager.js"; // Importación del productManager previamente creado para la creación y obtención de productos

const cartsManager = new CartsManager("./carts.json");
const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = req.body;
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

export { cartsRouter };
