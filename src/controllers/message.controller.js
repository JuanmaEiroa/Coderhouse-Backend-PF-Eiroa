import { messagesPersist } from "../dao/factory/factory.js";

class MessageController {
    constructor(){
        this.dao = messagesPersist;
    }

    async get(){
        return await this.dao.get();
    }

    async add(message){
        return await this.dao.add(message);
    }

    async delete(mid){
        return await this.dao.delete(mid)
    }
}

const messageController = new MessageController();
export default messageController;