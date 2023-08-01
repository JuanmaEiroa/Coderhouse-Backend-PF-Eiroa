import { appConfig } from "../../config/env.config.js";

let usersPersist;
let productsPersist;
let messagesPersist;
let cartsPersist;
switch (appConfig.persistence) {
  
  case "mongo":
    const { default: UserMongoDAO } = await import("../dbdao/user.dao.js");
    usersPersist = UserMongoDAO;
    const { default: ProductMongoDAO } = await import(
      "../dbdao/product.dao.js"
    );
    productsPersist = ProductMongoDAO;
    const { default: MessageMongoDAO } = await import(
      "../dbdao/message.dao.js"
    );
    messagesPersist = MessageMongoDAO;
    const { default: CartMongoDAO } = await import("../dbdao/cart.dao.js");
    cartsPersist = CartMongoDAO;
    break;

  case "file":
    const { default: UserFileDAO } = await import("../fsdao/user.dao.js");
    usersPersist = UserFileDAO;
    const { default: ProductFileDAO } = await import(
      "../fsdao/product.dao.js"
    );
    productsPersist = ProductFileDAO;
    const { default: MessageFileDAO } = await import(
      "../fsdao/message.dao.js"
    );
    messagesPersist = MessageFileDAO;
    const { default: CartFileDAO } = await import("../fsdao/cart.dao.js");
    cartsPersist = CartFileDAO;
    break;
}

export {usersPersist, productsPersist, messagesPersist, cartsPersist};