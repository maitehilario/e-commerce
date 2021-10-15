//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            compra = resultObj.data;
            compra = compra.articles
            showCarrito(compra);            
        }
    });
});

function showCarrito(array){
    let htmlContentToAppend = "";      
    for (let i = 0; i < array.length; i++) {
      let product = array[i]      
        htmlContentToAppend += 
         `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 d-flex align-items-center ">
      <img style="width: 155px;" class="p-2 " src="${product.src}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text"> Cantidad: 
        <input id="cant" onchange="calcSub(${i} , ${product.unitCost})" type="text" size="2" name=""  value="${product.count}"> <br> 
        Precio unitario:${product.unitCost} ${product.currency}</p>
         <p> Subtotal: <span id="sub" > 
         ${product.count * product.unitCost}</span> ${product.currency} </p>
         <p> Costo total: <span id="tot">  ${product.count * product.unitCost}  </span> ${product.currency} </p>
        </div>
    </div>
  </div>
</div> `
  }

    document.getElementById("cartProd").innerHTML = htmlContentToAppend; 
}

function calcSub(i, precio){
 
  cantidad = document.getElementById(`cant`).value
  sub = cantidad * precio 
  document.getElementById(`sub`).innerHTML = sub;
  document.getElementById("tot").innerHTML = sub
};