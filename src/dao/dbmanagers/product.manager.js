import { productModel } from "../models/product.model.js";

class ProductManager {
  constructor() {
    this.model = productModel;
  }

  async getProducts(limit = 10, page = 1, category = false, state = false) {
    let filter = {};

    if (category) {
      filter = { category };
    }
    if (state) {
      filter = { state };
    }

    return await this.model.paginate(filter, { lean: true, page, limit });
  }

  async getProductById(pid) {
    return await this.model.findById(pid).lean();
  }

  async addProduct(product) {
    return await this.model.create(product);
  }

  async updateProduct(pid, product) {
    return await this.model.findByIdAndUpdate(
      pid,
      { $set: product },
      { new: true }
    );
  }

  async deleteProduct(pid) {
    return await this.model.findByIdAndDelete(pid);
  }
}

const productManager = new ProductManager();

export default productManager;
