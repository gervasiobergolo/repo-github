//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
             
            <div class="col-md-4 my-3">
            <a href="product-info.html" class="list-group-item-action my-3">
                <div class="card px-2 py-3" style=" height: 31rem;">
                    <img class="card-img-top" src="${product.imgSrc}" alt="">
                    <div class="card-body">
                    <h2>${product.name}</h2>
                        <p class="card-text text-muted">${product.description}</p>
                        <p class="card-text text-muted">${product.currency} ${product.cost}</p>
                        <p class="card-text text-muted" style="text-align:right;">Vendidos: ${product.soldCount}</p> 
                    </div>
                </div>
             </a>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}
let filteredArray = [];


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data;
            currentProductsArray = sortProducts(ORDER_ASC_BY_COST, currentProductsArray);
            filteredArray = currentProductsArray
            showProductsList(currentProductsArray)
        }
    });

    const searchBar = document.getElementById('searchBar');

    searchBar.onkeyup = () => {
        let searchString = searchBar.value.toLowerCase();
        filteredArray = currentProductsArray.filter(item => {
            return item.name.toLowerCase().indexOf(searchString) > -1 || item.description.toLowerCase().indexOf(searchString) > -1;
        
        
        
        });

        showProductsList(filteredArray);

    }
    document.getElementById("sortAsc").addEventListener("click", function(){
        filteredArray = sortProducts(ORDER_ASC_BY_COST, filteredArray);

        showProductsList(filteredArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        filteredArray = sortProducts(ORDER_DESC_BY_COST, filteredArray);

        showProductsList(filteredArray);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        filteredArray = sortProducts(ORDER_BY_SOLD_COUNT, filteredArray);

        showProductsList(filteredArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(filteredArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(filteredArray);
    });
});