import { usersPersist } from "../dao/factory/factory.js";

class UserController {
  constructor() {
    this.dao = usersPersist;
  }

  async get() {
    return await this.dao.get();
  }

  async getByEmail(email) {
    return await this.collection.getByEmail(email);
  }

  async getById(id) {
    return await this.collection.getById(id);
  }

  async add(userData) {
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.password
    ) {
      throw new Error("Campos incompletos");
    }
    return await this.collection.add(userData);
  }
}

const userController = new UserController;
export default userController;