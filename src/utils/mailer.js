//Importaciones
import nodemailer from "nodemailer"
import { appConfig } from "../config/env.config.js";

//Definición de transport para envío de mail con ticket
export const mailerTransport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: appConfig.gmailUser,
      pass: appConfig.gmailAppPass,
    },
  });