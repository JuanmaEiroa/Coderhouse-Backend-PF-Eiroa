import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import productRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";
import messageRouter from "./routers/messages.router.js";
import viewsRouter from "./routers/views.router.js";
import * as path from "path";
import {app, io } from "./utils.js";
import messageManager from "./dao/dbmanagers/message.manager.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

app.use(express.static(path.join(process.cwd() + "/public")));

mongoose.connect(
  "mongodb+srv://juanmaeiroa:cel1540236483@codercluster.ictc3lo.mongodb.net/?retryWrites=true&w=majority",
  { dbName: "ecommerce" }
);

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", messageRouter);
app.use("/", viewsRouter);

io.on("connection", async (socket) => {
  socket.on("message", async (data) => {
    await messageManager.postMessage(data);
    io.emit("messageLogs", await messageManager.getMessages());
  });

  socket.on("sayhello", async (data) => {
    io.emit("messageLogs", await messageManager.getMessages());
    socket.broadcast.emit("alert", data);
  });
});
