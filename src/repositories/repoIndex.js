import { UsersPersist } from "../dao/factory/factory.js";
import UserRepository from "./users.repository.js";

export const userService = new UserRepository(new UsersPersist());