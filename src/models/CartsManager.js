import * as fs from "fs";

export default class CartsManager {
  //Declaración de variable y funciones para obtención automática del id por carrito ingresado
  #lastCartID = 0;

  //Obtención del último ID de la lista, obteniendo el máximo encontrado
  async #getLastId() {
    let cartList = JSON.parse(
      await fs.promises.readFile(this.path, "utf-8")
    );
    let oldIds = await cartList.map((prod) => prod.id);
    if (oldIds.length > 0) {
      return (this.#lastCartID = Math.max(...oldIds));
    }
  }

  //Asignación del nuevo ID al carrito a agregar
  async #getNewId() {
    await this.#getLastId();
    this.#lastCartID++;
    return this.#lastCartID;
  }

  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async addCart(prodCart) {
    try {
      let cartList = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      await cartList.forEach((cart) => {
        if (cart.id === prodCart.id) {
          console.log("Error: El ID ya existe");
        }
      });
      prodCart.id = await this.#getNewId();
      cartList.push(prodCart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartList));
    } catch (err) {
      console.log(`Error al agregar el carrito: ${err}`);
    }
  }

  async getCarts() {
    try {
      let cartList = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      return cartList;
    } catch (err) {
      console.log(`Error al obtener los carritos: ${err}`);
    }
  }

  async getCartById(id) {
    try {
      let cartList = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );

      return cartList.find((cart) => {
        return cart.id === id;
      });
    } catch (err) {
      console.log(`Error al obtener el carrito por ID: ${err}`);
    }
  }
}
