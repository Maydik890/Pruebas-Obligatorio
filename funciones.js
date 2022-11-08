window.addEventListener("load", inicio);

let usuarioLogueado = null;

let listaEmpresas = [
    new Empresa("GuilleSA", "gga", "123"),
    new Empresa("ORT", "ort", "123")
];

let listaImportadores = [
    new Importador("imp1", "123"),
    new Importador("imp2", "123")
];

function inicio(){
    document.querySelector("#btnLogin").addEventListener("click", login);
    document.querySelector("#btnRegistrar").addEventListener("click", registrarImportador);
    document.querySelector("#btnCrearviajelogin").addEventListener("click", Mostrarcrearviaje);
    document.querySelector("#btnCrearViaje").addEventListener("click", crearviaje);
    cargarPersonas();
    // mostrar("INICIAL");
    // Ocultar("Secciones");
    // Ocultar("EMPRESA");
    // Ocultar("IMPORTADOR");
    // Ocultar("crearViaje");
}

function cargarPersonas(){
    let texto = "";
    for(let i in listaEmpresas){
        let objPer = listaEmpresas[i];
        texto += 
        `<option value="${i}"> ${objPer.numero}</option>`
    }
    document.querySelector("#idSelect2").innerHTML = texto;
}


//<<<<<<<<<<<<<<<<<<<<<<<CONTROL IMPORTADOR//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// function registrarImportador (){
//     let usuario = document.querySelector("#userRegistro").value;
//     let nombre = document.querySelector("#userNombreUsuario").value;
//     let pass = document.querySelector("#passRegistro").value;
//     let imagen = document.querySelector("#txtFile").value;
//     if( estaRepetidoUsuario(usuario)){
//         alert("Usuario ya registrado.");
//     }else if(!passValida(pass)||pass.length<5){ 
//         alert("Formato de pass incorrecto.");
//     }else{
//         let imp = new Importador(usuario, nombre, imagen, pass);
//         listaImportadores.push(imp);
//         alert("Importador registrado correctamente")
//     }
// }

// function estaRepetidoUsuario(usuario){
//     let repetido = false;
//     for(let emp of listaEmpresas){
//         if(emp.usuario.toUpperCase() === usuario.toUpperCase()){
//             repetido = true;
//         }
//     }
//     for(let imp of listaImportadores){
//         if(imp.usuario.toUpperCase() === usuario.toUpperCase()){
//             repetido = true;
//         }
//     }
//     return repetido;
// }

// comprobar contrasena 

// function passValida(txt){
//     let tieneMayus = tieneMayuscula(txt)
//     let tieneMinus = tieneMinuscula(txt)
//     let tieneNum = tieneNumero(txt)
//     let Valido = false
//     if(tieneMayus === true&&tieneMinus === true && tieneNum === true){
//         Valido = true
//     }
//     return Valido
// }
// function tieneMayuscula(txt) {
//     let tiene = false;
//     for (let i = 0; i < txt.length && !tiene; i++) {
//       if (txt.charCodeAt(i) >= 65 && txt.charCodeAt(i) <= 90) {
//         tiene = true;
//       }
//     }
//     return tiene;
//   }
//   function tieneMinuscula(txt) {
//     let tiene = false;
//     for (let i = 0; i < txt.length && !tiene; i++) {
//       if (txt.charCodeAt(i) >= 97 && txt.charCodeAt(i) <= 122) {
//         tiene = true;
//       }
//     }
//     return tiene;
//   }
//   function tieneNumero(txt) {
//     let tiene = false;
//     for (let i = 0; i < txt.length && !tiene; i++) {
//       if (txt.charCodeAt(i) >= 48 && txt.charCodeAt(i) <= 57) {
//         tiene = true;
//       }
//     }
//     return tiene;
//   }
//   fin comprobar contrasena

//<<<<<<<<<<<<<<<<<<<<<<<FIN CONTROL IMPORTADOR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

//<<<<<<<<<<<<<<<<<<<<LOGIN IMPORTADOR/EMPRESA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function login(){
//     let usuario = document.querySelector("#user").value;
//     let pass = document.querySelector("#pass").value;
//     if(loginEmpresaValido(usuario, pass)){
//         mostrar("EMPRESA");
        

//     }else if(loginImportadorValido(usuario, pass)){
        
//         mostrar("IMPORTADOR");
        
       
//     }else{
//         alert("Datos incorrectos.")
//     }
    
// }

// function obtenerEmpresa(usuario){
//     let respuesta = null;
//     for(let empresaActual of listaEmpresas){
        
        
//     }
// }

// function loginEmpresaValido(usuario, password){
//     let loginCorrecto = false;
//     for(let i = 0; i < listaEmpresas.length && !loginCorrecto ; i++){
//         let empresaActual = listaEmpresas[i];
//         if(usuario.toUpperCase() === empresaActual.usuario.toUpperCase() && password === empresaActual.pass){
//             loginCorrecto = true;            
//         }
//     }
//     return loginCorrecto;
// }

// function loginImportadorValido(usuario, password){
//     let loginCorrecto = false;
//     for(let i = 0; i < listaImportadores.length && !loginCorrecto ; i++){
//         let importadorActual = listaImportadores[i];
//         if(usuario.toUpperCase() === importadorActual.usuario.toUpperCase() && password === importadorActual.pass){
//             loginCorrecto = true;
            

//         }
//     }
    
//     return loginCorrecto;

// }

function Mostrarcrearviaje(){

    mostrar("crearViaje")

}

let NuevoViaje = [];
function crearviaje(){
    let TipodeCarga = document.querySelector("#idSelect").value;
    let PuertoOrigen = document.querySelector("#idPuertoOrigen").value;
    let contenedores = parseInt(document.querySelector("#idCantidadContenedores").value);
    let idEmpresa = document.querySelector("#idSelect2").value;
    let Descripcion = document.querySelector("#txtDescripcion").value;


    

    





    
    
    
}
