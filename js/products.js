let productosArray = [];

function setCatID(id) {
    localStorage.setItem("PID", id);
    window.location = "product-info.html"
}

function ShowProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let producto = array[i];
        htmlContentToAppend += `
        <div onclick="setCatID(`+producto.id+`)" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ producto.name + " - " + producto.currency +" "+ producto.cost + `</h4> 
                        <p> `+ producto.description +`</p> 
                        </div>
                        <small class="text-muted">` + producto.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}
const AS_precio = "A$";
const DE_precio = "D$";
const Products_cont = "Cant.";
function ordenarProduct(criteria, arrayy){
    let result = [];
    if (criteria === AS_precio)
    {
        result = arrayy.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === DE_precio){
        result = arrayy.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === Products_cont){
        result = arrayy.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
let criterion = undefined;
function ordenarymostrar(criterio, array){
    criterion = criterio
    ArrayOredenado = ordenarProduct(criterion, array);

    ShowProductsList(ArrayOredenado);
}
function filtrando(array){
    let Desde = parseInt(document.getElementById('Desde').value);
    let Hasta = parseInt(document.getElementById('Hasta').value);
    
    let listfil = array.filter(producto=> producto.cost >= Desde && producto.cost <= Hasta);
    ShowProductsList(listfil);
}

let IDP = localStorage.getItem("catID");


document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODUCTS_URL+ IDP +EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productosArray = resultObj.data.products;
            ShowProductsList(productosArray);
            document.getElementById("nombrep").innerHTML = resultObj.data.catName;   
        }
    });
    document.getElementById("filtrar").addEventListener("click", ()=>{
        filtrando(productosArray);
    });
    document.getElementById("A$").addEventListener("click", function(){
        ordenarymostrar(AS_precio,productosArray);
    });

    document.getElementById("D$").addEventListener("click", function(){
        ordenarymostrar(DE_precio,productosArray);
    });

    document.getElementById("CANT").addEventListener("click", function(){
        ordenarymostrar(Products_cont,productosArray);
    });
    let nombre = localStorage.getItem("nombre");

    if (nombre == null) {
        location.href = "login.html";
    }else{
        document.getElementById("nombre").innerHTML = nombre;
    }
    document.getElementById("cerrar").addEventListener("click", ()=> {
        localStorage.clear();
        location.href="login.html";
    });
    document.getElementById("Limpiar").addEventListener("click", function(){
        document.getElementById("Desde").value = "";
        document.getElementById("Hasta").value = "";

        ShowProductsList(productosArray);
    });
});