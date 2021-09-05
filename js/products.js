//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = [];
var minPrice = undefined;
var maxPrice = undefined;

function showProductsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i]

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

        htmlContentToAppend +=

            `<a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class= "img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1" >`+ product.name + `</h4>
                        <small class="text-muted">` + product.cost + " USD" + `</small>
                    </div>
                <p class="mb-1">`+ product.description + `</p>
                </div> 
            </div>
        </a>`
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});


function sortProduct(criterio, array) {
    let result = [];

    if (criterio === 1) {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            });
    } else if (criterio === 2) {
        result = array.sort(
            function (a, b) {
                if (a.cost > b.cost) { return -1; }
                if (a.cost < b.cost) { return 1; }
                return 0;
            });
    } else if (criterio===3){
        result = array.sort(
            function (a, b) {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            });
    }
    return result
}

document.getElementById("sortAsc").addEventListener("click", function () {
    productsArray = sortProduct(1, productsArray)
    showProductsList(productsArray);
});

document.getElementById("sortDesc").addEventListener("click", function () {
    productsArray = sortProduct(2, productsArray)
    showProductsList(productsArray);
});

document.getElementById("sortByRelev").addEventListener("click", function () {
    productsArray = sortProduct(3, productsArray)
    showProductsList(productsArray);
});

document.getElementById("Filtrar").addEventListener("click", function(){
    minPrice = document.getElementById("precio-min").value;
    maxPrice = document.getElementById("precio-max").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProductsList(productsArray);
});

document.getElementById("Limpiar").addEventListener("click", function(){
    document.getElementById("precio-min").value = "";
    document.getElementById("precio-max").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProductsList(productsArray);
});