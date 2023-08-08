export const generateUserErrorInfo = (user) => {
    return `
    Error al crear el usuario ${user.name} ${user.lastname} con el email ${user.email}
    `
}

export const generateProdErrorInfo = (product) => {
    return `
    Error al cargar el producto.
    
    Los siguientes campos son requeridos:
        •Nombre de producto: ${product.title}
        •Precio de producto: ${product.price}
    `
}