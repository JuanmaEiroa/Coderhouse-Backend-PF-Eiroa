import { Router } from "express";
import productManager from "../dao/dbmanagers/product.manager.js";
import messageManager from "../dao/dbmanagers/message.manager.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
  let page = parseInt(req.query.page);
  if (!page) page = 1;
  let result = await productManager.getProducts();
  console.log(result)
  result.prevLink = result.hasPrevPage
    ? `http://localhost:8080/products?page=${result.prevPage}`
    : "";
  result.nextLink = result.hasNextPage
    ? `http://localhost:8080/products?page=${result.nextPage}`
    : "";
  result.isValid = !(page <= 0 || page > result.totalPages);
  res.render("products",  result );
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const renderProdList = await productManager.getProducts();
  res.render("realTimeProducts", { renderProdList });
});

viewsRouter.get("/chat", async (req, res) => {
  const renderMessages = await messageManager.getMessages();
  res.render("chat", { renderMessages });
});

export default viewsRouter;
