function login(){

let correo = document.getElementById("email").value;
let clave = document.getElementById("contraseña").value;
let nombre = document.getElementById("nombre").value;

if (correo === "" && clave === "" && nombre === ""){
   document.getElementById("email").classList.add('is-invalid');
   document.getElementById("contraseña").classList.add('is-invalid');
   document.getElementById("nombre").classList.add('is-invalid');
}else if (correo === "" && clave === ""){
    document.getElementById("email").classList.add('is-invalid');
    document.getElementById("contraseña").classList.add('is-invalid');
}else if (correo === "" && nombre === ""){
    document.getElementById("email").classList.add('is-invalid');
    document.getElementById("nombre").classList.add('is-invalid');
}else if (nombre === "" && clave === ""){
    document.getElementById("nombre").classList.add('is-invalid');
    document.getElementById("contraseña").classList.add('is-invalid');
}else if(nombre === ""){
    document.getElementById("nombre").classList.add('is-invalid');
}else if(clave === ""){
    document.getElementById("contraseña").classList.add('is-invalid');
}else if(correo === ""){
    document.getElementById("email").classList.add('is-invalid');
}else{
    localStorage.setItem('nombre',nombre);
    location.href = 'index.html';
}
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('boton').addEventListener('click',()=>{
        login();
    })
}
)
