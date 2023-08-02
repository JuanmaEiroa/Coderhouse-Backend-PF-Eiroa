import { Router } from "express";
import productController from "../controllers/product.controller.js";
import messageController from "../controllers/message.controller.js";
import cartController from "../controllers/cart.controller.js";
import userController from "../controllers/user.controller.js";
import { isAuth, isGuest, isUser, isAdmin } from "../middlewares/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get("/", isGuest, (req, res) => {
  res.render("login", {
    title: "Iniciar sesión",
  });
});

viewsRouter.get("/products", isAuth, async (req, res) => {
  const { user } = req.session;
  delete user.password;
  const { limit, page, category, availability, sort } = req.query;
  const prodList = await productController.get(
    limit,
    page,
    category,
    availability,
    sort
  );
  prodList.status = "success";
  prodList.category = category;
  prodList.availability = availability;
  prodList.sort = sort;
  prodList.prevLink = prodList.hasPrevPage
    ? `products?page=${prodList.prevPage}`
    : "";
  prodList.nextLink = prodList.hasNextPage
    ? `products?page=${prodList.nextPage}`
    : "";
  res.render("products", {
    title: "Listado de Productos",
    prodList,
    user,
  });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartController.getById(req.params.cid);
    res.render("cart", cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const prodList = await productController.get();
  res.render("realTimeProducts", { prodList });
});

viewsRouter.get("/chat", isUser, async (req, res) => {
  const renderMessages = await messageController.get();
  res.render("chat", { renderMessages });
});

viewsRouter.get("/register", isGuest, (req, res) => {
  res.render("register", {
    title: "Registrar nuevo usuario",
  });
});

viewsRouter.get("/registererror", (req, res) => {
  res.render("registererror", {
    title: "Error al registrarse",
  });
});

viewsRouter.get("/loginerror", (req, res) => {
  res.render("loginerror", {
    title: "Error al iniciar sesión",
  });
});

viewsRouter.get("/current", async (req, res) => {
  const { user } = req.session;
  const cart = await cartController.getById(user.cart);
  const userToShow = await userController.getById(user.id);
  console.log(userToShow);
  res.render("current", {
    title: "Carrito de Compras",
    userToShow,
    cart,
  });
});

export default viewsRouter;
