//Importaciones
import UserDTO from "../dto/user.dto.js";

//Creación del repositorio de usuarios
export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  //Obtener todos los usuarios
  async get() {
    return await this.dao.get();
  }

  //Obtener por E-mail
  async getByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  //Obtener por ID (usando DTO)
  async getById(id) {
    const user = await this.dao.getById(id);
    const userDTO = new UserDTO(user);
    return userDTO;
  }

  //Crear un nuevo usuario (realizando validaciones de campos)
  async add(userData) {
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.password
    ) {
      throw new Error("Campos incompletos");
    }
    return await this.dao.add(userData);
  }

  //Actualizar un usuario por su ID
  async update(uid, user) {
    return await this.dao.update(uid, user);
  }
}
