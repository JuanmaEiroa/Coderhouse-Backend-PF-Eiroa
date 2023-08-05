//import { UsersPersist } from "../dao/factory/factory.js";
import UserMongoDAO from "../dao/dbdao/user.dao.js"
import UserRepository from "./users.repository.js";
import TicketMongoDAO from "../dao/dbdao/ticket.dao.js"
import TicketRepository from "./tickets.repository.js";

export const userService = new UserRepository(new UserMongoDAO());
export const ticketService = new TicketRepository(new TicketMongoDAO());