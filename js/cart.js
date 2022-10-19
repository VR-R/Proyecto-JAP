function precioTotal(){
    let Multipico = 0;
    Multipico = parseInt((document.getElementById("cant").value)*(info.unitCost));

    document.getElementById("sub").innerHTML = `${info.currency} ${Multipico}` ;
}




let IDU = 25801;
document.addEventListener("DOMContentLoaded",()=>{
    getJSONData(CART_INFO_URL + IDU + EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok")
        {
             info = resultObj.data.articles[0];
             document.getElementById("imag").innerHTML =` <img id="imgIl" class="rounded mx-auto d-block" src=${info.image} alt="product image" width="100">`
             document.getElementById("name").innerHTML = info.name;
             document.getElementById("cost").innerHTML = `${info.currency} ${info.unitCost}`;
             document.getElementById("cant").value = info.count;
             precioTotal();
        }
    }); 
    document.getElementById("cant").addEventListener("change",()=>{
        precioTotal();
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
});