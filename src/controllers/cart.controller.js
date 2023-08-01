import { productsPersist } from "../dao/factory/factory.js";

class CartController {
  constructor() {
    this.dao = productsPersist;
  }

  async get() {
    return await this.dao.get();
  }

  async getById(cid) {
    return await this.dao.getById(cid);
  }

  async add(cart) {
    return await this.dao.add(cart);
  }

  async update(cid, cart) {
    return await this.dao.update(cid, cart);
  }

  async addProdtoCart(cid, pid) {
    return await this.dao.addProdtoCart(cid, pid);
  }

  async deleteProdfromCart(cid, pid) {
    return await this.dao.deleteProdfromCart(cid, pid);
  }

  async deleteAllProds(cid) {
    return await this.dao.deleteAllProds(cid);
  }

  async updateProdfromCart(cid, pid, quantity) {
    return await this.dao.updateProdfromCart(cid, pid, quantity);
  }
}

const cartController = new CartController();
export default cartController;