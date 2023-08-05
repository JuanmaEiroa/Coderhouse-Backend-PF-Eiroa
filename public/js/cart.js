function endPurchase (){
    const cid = document.getElementById("cartId").value;
    const url = `/api/carts/${cid}/purchase`;
    fetch(url, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          console.log("Error al obtener response para finalizar compra");
        }
      })
      .catch((err) => {
        console.log("Error interno al finalizar compra:", err);
      });
  }