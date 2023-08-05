import {
  cartService,
  productService,
  ticketService,
} from "../repositories/repoIndex.js";

//TERMINAR GENERACIÓN DE TICKET

class PurchaseController {
  async endPurchase(cid) {
    //Obtengo el carrito y sus productos
    const cart = await cartService.getById(cid);
    const cartProducts = cart.products;

    //Genero un array para los productos finales
    const finalProducts = [];

    //Recorro cada producto y obtengo su id
    cartProducts.forEach(async (prod) => {
      const cartProdId = prod.product;
      
      //Se busca producto por id en la lista
      const productFromList = await productService.getById(cartProdId);
      //console.log(productFromList)

      //Si la cantidad es menor o igual al stock disponible, se restan del mismo
      if (prod.quantity < productFromList.stock) {
        productFromList.stock -= prod.quantity;
        await productService.update(productFromList._id, productFromList);
        finalProducts.push(prod);
        await cartService.deleteProdfromCart(cid, prod.product)
      } else {
        console.log(`${prod.product.title}: Stock insuficiente para la compra`);
      }
    });
  }
}

const purchaseController = new PurchaseController();
export default purchaseController;
