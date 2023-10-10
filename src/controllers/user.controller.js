//Importaciones
import { userService } from "../repositories/repoIndex.js";
import { appConfig } from "../config/env.config.js";
import { mailerTransport } from "../utils/mailer.js";

//Creación del controlador de usuarios
class UserController {
  constructor() {
    this.service = userService;
  }

  //Obtener los usuarios
  async get() {
    return await this.service.get();
  }

  //Obtener por E-Mail
  async getByEmail(email) {
    return await this.service.getByEmail(email);
  }

  //Obtener por ID
  async getById(id) {
    return await this.service.getById(id);
  }

  //Crear nuevo usuario
  async add(userData) {
    return await this.service.add(userData);
  }

  //Actualizar usuario por su ID
  async update(uid, user) {
    return await this.service.update(uid, user);
  }

  //Cambiar rol del usuario por su ID
  async changeRole(uid) {
    //Se obtiene el usuario por su ID
    const user = await this.service.getById(uid);
    //Se define la función para validar que el usuario haya cargado los documentos necesarios para poder ser premium
    const validatePremium = () => {
      const userDocs = user.documents.map((doc) => doc.name);
      const neededDocs = [
        "ID Document",
        "Address Document",
        "Account Document",
      ];
      if (neededDocs.every((doc) => userDocs.includes(doc))) {
        user.role = "Premium";
      } else {
        throw new Error("Se necesitan cargar los archivos necesarios");
      }
    };
    //Si el usuario tiene el rol "User", se realiza la validación y se lo transforma en "Premium". Si es "Premium", se transforma en "User" sin validación.
    if (user.role === "User") {
      validatePremium();
    } else if (user.role === "Premium") {
      user.role = "User";
    }
    //Se actualiza el usuario
    await this.service.update(uid, user);
    return user
  }

  //Eliminar usuario por su ID
  async delete(uid) {
    const userToDelete = await userController.getById(uid)
    //Generación de mail para indicar que se eliminó el usuario
    let mail = await mailerTransport.sendMail({
      from: `CoderCommerce ${appConfig.gmailUser}`,
      to: userToDelete.email,
      subject: "Eliminación de usuario por inactividad",
      html: `
                    <div>
                    <h1>Su usuario ha sido eliminado por inactividad</h1>
                    <p>Lamentamos informarle que su usuario ha sido eliminado de nuestra plataforma debido a haber superado el período de inactividad de 2 días.</p>
                    <p>Lo invitamos a crearse una cuenta nuevamente para poder seguir utilizando nuestro servicio de e-commerce</p>
                    <a href="http://localhost:8080/"><button>Ingresar a la página</button></a>
                    </div>
              `,
      attachments: [],
    });
    return await this.service.delete(uid)
  }
}

const userController = new UserController();
export default userController;
