//Importaciones
import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";
import { multerGenerator } from "../middlewares/multer.middleware.js";

//Creación del router de usuarios
const userRouter = Router();

//Creación de un nuevo usuario por medio del registro con passport
userRouter.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/registererror" }),
  async (req, res) => {
    res.redirect("/");
  }
);

//Error de registro con passport
userRouter.get("/registererror", async (req, res) => {
  res.send({ error: "Error de estrategia al registrarse" });
});

//Uso de passport para autenticación en inicio de sesión.
userRouter.post(
  "/auth",
  passport.authenticate("login", { failureRedirect: "/loginerror" }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales inválidas" });
    }
    const user = req.user;
    delete user.password;
    req.session.user = user;
    res.redirect("/");
  }
);

//Inicio de sesión con GitHub
userRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

userRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

//Error de inicio de sesión con passport
userRouter.get("/loginerror", (req, res) => {
  res.send({ error: "Fallo en el inicio de sesión" });
});

//Cierre de sesión
userRouter.post("/logout", async (req, res) => {
  const uid = req.session.user._id;
  const user = await userController.getById(uid);
  user.last_connection = new Date();
  await userController.update(uid, user);
  req.session.destroy();
  res.status(201).redirect("/");
});

//Cambio de rol de usuario (User-Premium)
userRouter.get("/premium/:uid", async (req, res) => {
  try {
    const user = await userController.changeRole(req.params.uid);
    req.session.user.role = user.role;
    res.redirect("/");
  } catch (err) {
    req.logger.error(`Error al cambiar el rol del usuario: ${err}`);
    res.status(500).send(`Error al cambiar el rol del usuario: ${err}`);
  }
});

//Carga de documentos con Multer
userRouter.post(
  "/:uid/documents",
  multerGenerator("/public/data/documents", ".pdf").fields([
    { name: "idFile", maxCount: 1 },
    { name: "addressCompFile", maxCount: 1 },
    { name: "accountCompFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const user = await userController.getById(req.params.uid);
      if (req.files.idFile) {
        user.documents.push({
          name: "ID Document",
          reference: req.files.idFile[0].path,
        });
      }
      if (req.files.addressCompFile) {
        user.documents.push({
          name: "Address Document",
          reference: req.files.addressCompFile[0].path,
        });
      }
      if (req.files.accountCompFile) {
        user.documents.push({
          name: "Account Document",
          reference: req.files.accountCompFile[0].path,
        });
      }
      await userController.update(req.params.uid, user);
      req.logger.info("Archivos subidos correctamente!");
      res.status(201).send("Archivos subidos correctamente!");
    } catch (error) {
      req.logger.error(`Error interno al subir documentos: ${err}`);
      res.status(500).send(`Error interno al subir documentos: ${err}`);
    }
  }
);

//Carga de imagen de perfil con Multer
userRouter.post(
  "/:uid/profImg",
  multerGenerator("/public/data/images/profiles", ".jpg").single("profImg"),
  async (req, res) => {
    try {
      const user = await userController.getById(req.params.uid);
      user.img = req.file.filename;
      await userController.update(req.params.uid, user);
      req.logger.info("Imagen de perfil actualizada!");
      res.status(201).send("Imagen de perfil actualizada!");
    } catch (error) {
      req.logger.error(`Error interno al actualizar la foto de perfil: ${err}`);
      res.status(500).send(`Error interno al actualizar la foto de perfil: ${err}`);
    }
  }
);

export default userRouter;
