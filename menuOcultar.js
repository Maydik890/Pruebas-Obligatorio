function ocultarTodas(){
    document.querySelector("#INICIAL").style.display = "none";
    document.querySelector("#EMPRESA").style.display = "none";
    document.querySelector("#IMPORTADOR").style.display = "none";
    document.querySelector("#crearViaje").style.display = "none";

}

function mostrar(id){
    document.querySelector("#"+id).style.display = "block";
}

function Ocultar(id){
    document.querySelector("#"+id).style.display = "none";
}