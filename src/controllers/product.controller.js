//import { productsPersist } from "../dao/factory/factory.js";
import ProductMongoDAO from "../dao/dbdao/product.dao.js";

class ProductController {
  constructor() {
    this.dao = new ProductMongoDAO();
  }

  async get() {
    return await this.dao.get();
  }

  async getById(pid) {
    return await this.dao.getById(pid);
  }

  async add(product) {
    return await this.dao.add(product);
  }

  async update(pid, product) {
    return await this.dao.update(pid, product);
  }

  async deleteProduct(pid) {
    return await this.dao.delete(pid);
  }
}

const productController = new ProductController();
export default productController;
