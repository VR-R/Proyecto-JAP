
function mostrarProducto(Producto){
let lista = "";
lista += `<h1> ${Producto.name} </h1><hr>
        <h4><b>Precio</b><br> ${Producto.currency} ${Producto.cost}</h4>
        <h4><b>Descripción</b><br> ${Producto.description}</h4>
        <h4><b>Categoria</b><br> ${Producto.category}</h4>
        <h4><b>Cantidad de vendidos</b><br> ${Producto.soldCount}</h4>
        <h3> ${imagenes(Producto)}<h3>`

document.getElementById("container").innerHTML = lista;
};
function imagenes(Producto){
    let htmlImages = "";
    for(let i = 0; i < Producto.images.length; i++){
    let array = Producto.images[i];  
        htmlImages += `
  <img id="imgIl" src="`+ array +`" width=22% class="img-thumbnail">
  `
    }
 return htmlImages;
};
function Mostrarcomentarios(){
    let mostrar = "";
    for(let i = 0; i < Comentarios.length; i++){
    let array = Comentarios[i];
    mostrar +=  `<div class="list-group-item">
    ${array.user} ${array.dateTime}-${Estrellitas(array.score)}<br>
    ${array.description}</div> `
}
document.getElementById("Comentario").innerHTML = mostrar;
};
function AgregarComentario(Comentarios){
    let Comentario ={};
    Comentario.user = document.getElementById("nombre").value;
    Comentario.score = document.getElementById("puntaje").value;
    Comentario.description = document.getElementById('NuevoComent').value;
    Comentarios.push(Comentario);
    Mostrarcomentarios(Comentarios);
};
function Estrellitas(puntos){
    let estrellas ="";
    for(let i = 1; i <= 5; i++){
    if (i<=puntos){
        estrellas += `<i class = "fas fa-star checked"></i>`;
    }else{
        estrellas += `<i class = "far fa-star checked"></i>`;
    }
}
    return estrellas;
};
function setCatID(id) {
    localStorage.setItem("PID", id);
    window.location = "product-info.html"
};
function ProductosRelacionados(Producto){
    let OtrosProductos ="";
    let ProdutosR = Producto.relatedProducts;
    for(let i=0; i<ProdutosR.length; i++){
        let Productos = ProdutosR[i];
        OtrosProductos += `
        <div onclick="setCatID(`+Productos.id+`)" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                <h4>${Productos.name}</h4>
                    <img src="` + Productos.image + `" alt="product image" class="img-thumbnail">
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("ProductosRelacionados").innerHTML = OtrosProductos;
};

document.addEventListener("DOMContentLoaded",()=>{
    let PID = localStorage.getItem("PID");
    getJSONData(PRODUCT_INFO_URL + PID + EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok")
        {
            Producto = resultObj.data;
            mostrarProducto(Producto);
            ProductosRelacionados(Producto);
        }
    }); 
    getJSONData(PRODUCT_INFO_COMMENTS_URL + PID + EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok")
        {
            Comentarios = resultObj.data;
            Mostrarcomentarios(Comentarios);

        }
    }); 
    document.getElementById("enviar").addEventListener("click", function(){
        AgregarComentario(Comentarios);
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