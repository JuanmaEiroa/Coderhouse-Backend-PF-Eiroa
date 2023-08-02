import { usersPersist } from "../dao/factory/factory.js";
import UserRepository from "./users.repository.js";

export const userService = new UserRepository(usersPersist);