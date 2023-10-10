//Importaciones
import { productService } from "../repositories/repoIndex.js";
import { mailerTransport } from "../utils/mailer.js";
import { appConfig } from "../config/env.config.js";

//Creación del controlador de productos
class ProductController {
  constructor() {
    this.service = productService;
  }

  //Obtener productos
  async get(limit, page, category, status, sort) {
    return await this.service.get(limit, page, category, status, sort);
  }

  //Obtener por ID
  async getById(pid) {
    return await this.service.getById(pid);
  }

  //Agregar un producto
  async add(product) {
    return await this.service.add(product);
  }

  //Actualizar un producto por su ID
  async update(pid, product) {
    return await this.service.update(pid, product);
  }

  //Borrar un producto por su ID
  async delete(pid) {
    //Se obtiene el dueño del producto. Si es un usuario premium, se genera y envía un mail a su correo avisandole la eliminación.
    const prodToDelete = await this.service.getById(pid);
    if (prodToDelete.owner !== "Admin") {
      let mail = await mailerTransport.sendMail({
        from: `CoderCommerce ${appConfig.gmailUser}`,
        to: prodToDelete.owner,
        subject: "Eliminación de su Producto",
        html: `
                      <div>
                      <h1>Eliminación de su producto de nuestra tienda</h1>
                      <p>Le informamos que su producto ha sido removido de nuestro catálogo</p>
                      <p>Puede ver el nuevo catálogo ingresando en el siguiente enlace:</p>
                      <a href="http://localhost:8080/"><button>Ir al catálogo</button></a>
                      </div>
                `,
        attachments: [],
      });
    }
    //Se elimina el producto
    return await this.service.delete(pid);
  }
}

const productController = new ProductController();
export default productController;
