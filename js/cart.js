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
      sub = product.count * product.unitCost
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
        <input min="1" style="width: 50px" type="number" id="cant" onchange="calcSub(${i} , ${product.unitCost})" type="text" size="2" name=""  value="${product.count}"> <br> 
        Precio unitario:${product.unitCost} ${product.currency}</p>
         <p> Subtotal: <span id="sub" > 
         ${product.count * product.unitCost}</span> ${product.currency} </p>
         <p> Costo total: <span id="tot">  ${product.count * product.unitCost}  </span> ${product.currency} </p>
        </div>
    </div>
  </div>
</div> `
  }
    document.getElementById("subtot").innerHTML = `${sub}`
    document.getElementById("cartProd").innerHTML = htmlContentToAppend; 
}


function calcSub(i, precio){
  
  cantidad = document.getElementById(`cant`).value
  sub = cantidad * precio 
  document.getElementById(`sub`).innerHTML = sub;
  document.getElementById("tot").innerHTML = sub
  document.getElementById("subtot").innerHTML = `${sub}`
  calcEnvio()
};

function calcEnvio(){
  
    standard = document.fenvio.envio[0].checked
    express = document.fenvio.envio[1].checked
    premium = document.fenvio.envio[2].checked

    if (standard){
    precioenvio = (5*sub)/100
    document.getElementById("costenvio").innerHTML = ` ${precioenvio}  `
    } else if (express) {
      precioenvio = (7*sub)/100
      document.getElementById("costenvio").innerHTML = ` ${precioenvio}  `
    } else if (premium) {
      precioenvio = (15*sub)/100
    document.getElementById("costenvio").innerHTML = ` ${precioenvio}  `
    }
  calcTotal()
}

function calcTotal(){
  tot = sub + precioenvio
  document.getElementById("total").innerHTML = `${tot}`
}


function validacion(){

  let flag = true
  
  mediopago = document.getElementsByClassName("mediopago")
  if (!mediopago[0].checked && !mediopago[1].checked ) {
    alert("Elegir medio de pago")
    flag = false
  } else { 
    if (mediopago[0].checked) {
      nrocuenta = document.getElementById("nrocuenta").value
      if (nrocuenta === "") {
        alert("Faltan campos: número de cuenta")
        flag = false
      }
    } else {
      nrotarj = document.getElementById("nrotarj").value
      csv = document.getElementById("csv").value
      venc = document.getElementById("venc").value
      
      if (nrotarj === "" || csv === "" || venc === "" ) {
        
        flag = false

        if (nrotarj === "") { alert ("Faltan campos: número de tarjeta")} ;
        if (csv === "") { alert ("Faltan campos: número verificador")}
        if (venc === "") { alert ("Faltan campos: fecha de vencimiento") }
      } 
    }
  }


 return flag

}


let form = document.getElementById("form");
form.addEventListener('submit', function (event) {
    if (!validacion()) {
        event.preventDefault()
        event.stopPropagation()        
    } else { alert ("¡Ha comprado con éxito!")}
    
});
