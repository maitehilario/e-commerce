//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showProductsInfo(product) {
    let htmlContentToAppend = "";

    htmlContentToAppend +=

        `<div class="list-group-item">
        <div  class="d-flex w-100 justify-content-between">
            <h2 style="display: inline-block;">` + product.name + `</h2> 
            <small style="display: inline-block;"> 
            Precio: ${product.cost}USD <br>
            Cantidad de vendidos: ${product.soldCount} </small>          
        </div>           
            <p style="display: inline-block">` + product.description + `</p> 
            
            <center>
            <img width="49%" src= "`+ product.images[0] + `" alt="` + `" class= "img-thumbnail"> 
            <img width="49%" src= "`+ product.images[1] + `" alt="` + `" class= "img-thumbnail">
            <img width="32%" src= "`+ product.images[2] + `" alt="` + `" class= "img-thumbnail"> 
            <img width="32%" src= "`+ product.images[3] + `" alt="` + `" class= "img-thumbnail">
            <img width="32%" src= "`+ product.images[4] + `" alt="` + `" class= "img-thumbnail"> 
            </center>
            </div>`


    document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            onix = resultObj.data;
            showProductsInfo(onix);
        }
    });
});

function showProductsComments(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i]
        let puntaje = ""

        htmlContentToAppend +=

            `<small style="float: right;"> ${product.dateTime}</small>
            <div class= "d-flex w-100 style="display: inline-block" >
            <h5> ${product.user} dice:  &nbsp;&nbsp;  </h5> 
            <p> "${product.description}" </p> 
            </div>
            
            `

        for (let i = 1; i < product.score; i++) {
            puntaje += `<span class="fa fa-star checked"></span>;`
        }

        for (let i = product.score; i <= 5; i++) {
            puntaje += `<span class="fa fa-star"></span>;`
        }


        htmlContentToAppend += `<div style="text-align: right;"> ${puntaje} </div> <br> <hr>`;


    }
    document.getElementById("prod-comment-container").innerHTML += htmlContentToAppend;

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsComments(productsArray);
        }
    });
});

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("estrella").innerHTML =
        `<div class="star-rating">
 <input id="star-5" type="radio" name="rating" value="5"  />
 <label for="star-5" title="5 stars">
   <i class="active fa fa-star"></i>
 </label>

 <input id="star-4" type="radio" name="rating" value="4"/>
 <label for="star-4" title="4 stars">
   <i class="active fa fa-star"></i>
 </label>

 <input id="star-3" type="radio" name="rating" value="3"/>
 <label for="star-3" title="3 stars">
   <i class="active fa fa-star"></i>
 </label>

 <input id="star-2" type="radio" name="rating" value="2" />
 <label for="star-2" title="2 stars">
   <i class="active fa fa-star"></i>
 </label>

 <input id="star-1" type="radio" name="rating" value="1" checked/>
 <label for="star-1" title="1 star">
   <i class="active fa fa-star"></i>
 </label>
 
</div>`
});