import { Router } from "express";
import productManager from "../dao/dbmanagers/product.manager.js";
import messageManager from "../dao/dbmanagers/message.manager.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
  const { limit, page, category, state } = req.query;
  const prodList = await productManager.getProducts(
    limit,
    page,
    category,
    state
  );
  prodList.category = category;
  console.log(prodList);
  res.render("products", prodList);
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const prodList = await productManager.getProducts();
  res.render("realTimeProducts", { prodList });
});

viewsRouter.get("/chat", async (req, res) => {
  const renderMessages = await messageManager.getMessages();
  res.render("chat", { renderMessages });
});

export default viewsRouter;
