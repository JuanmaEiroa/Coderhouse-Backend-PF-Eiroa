//import { UsersPersist } from "../dao/factory/factory.js";
import UserMongoDAO from "../dao/dbdao/user.dao.js"
import UserRepository from "./users.repository.js";

export const userService = new UserRepository(new UserMongoDAO());