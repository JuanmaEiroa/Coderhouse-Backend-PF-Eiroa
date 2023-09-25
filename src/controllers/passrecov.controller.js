//Importaciones
import nodemailer from "nodemailer";
import { appConfig } from "../config/env.config.js";
import { userService } from "../repositories/repoIndex.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.util.js";

//Creación del transporte para envío de mails con Nodemailer
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: appConfig.gmailUser,
    pass: appConfig.gmailAppPass,
  },
});

//Creación del controlador para recuperación de contraseñas
class PassRecovController {
  //Función para envío de mail
  async sendMail(email) {
    try {
      //Definición del mail a enviar por Nodemailer (asunto, cuerpo, direcciones)
      let mail = await transport.sendMail({
        from: `CoderCommerce ${appConfig.gmailUser}`,
        to: email,
        subject: "Restablecimiento de contraseña",
        html: `
                      <div>
                      <h1>Mail para restablecimiento de contraseña</h1>
                      <p>Se ha enviado el siguiente correo para poder restablecer su contraseña en nuestro e-commerce. Haga click en el siguiente botón para hacerlo:</p>
                      <a href="http://localhost:8080/newpass"><button>Restablecer contraseña</button></a>
                      </div>
                `,
        attachments: [],
      });
    } catch (error) {
      console.log(
        `Error interno al intentar enviar el correo de recuperación: ${error}`
      );
    }
  }

  //Función para actualización de contraseña
  async updatePass(userEmail, newPass) {
    //Se obtiene el usuario por su email
    const user = await userService.getByEmail(userEmail);
    //Si la contraseña es la misma a la anterior, se envía un error
    if (comparePassword(user, newPass)) {
      throw new Error("No se puede utilizar la contraseña ya existente");
    } else {
      //Se crea la contraseña hasheada con bcrypt y se actualiza la misma en la BD
      const newHashedPass = encryptPassword(newPass);
      user.password = newHashedPass;
      return await userService.update(user._id, user);
    }
  }
}

export const passRecovController = new PassRecovController();
