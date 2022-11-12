window.addEventListener("load", inicio);

let usuarioLogueado = null;

let listaEmpresas = [
  new Empresa("GuilleSA", "gga", "123"),
  new Empresa("ORT", "ort", "123"),
];

let listaImportadores = [
  new Importador("imp1", "123"),
  new Importador("imp2", "123"),
];

let viajes = [];

function inicio() {
  document.querySelector("#btnLogin").addEventListener("click", login);
  document.querySelector("#btnMostRegistro").addEventListener("click", MostRegistro);
  document.querySelector("#btnRegistrar").addEventListener("click", registrarImportador);
  document.querySelector("#btnMostInicio").addEventListener("click", MostInicio);
  document.querySelector("#btnCrearviajelogin").addEventListener("click", Mostrarcrearviaje);
  document.querySelector("#btnCrearViaje").addEventListener("click", crearviaje);
  document.querySelector("#btnPendientes").addEventListener("click", MosTablaPendinte);
  document.querySelector("#btnBuscarPendiente").addEventListener("click", BuscarPendiente);
  document.querySelector("#VolverCrearViaje").addEventListener("click", VolverCrearViaje);
  cargarPersonas();
  mostrar("INICIAL");
  Ocultar("Registro");
  Ocultar("Secciones");
  Ocultar("EMPRESA");
  Ocultar("IMPORTADOR");
}
let estado=["Pendiente","Aceptado","Cancelado"]

function cargarPersonas() {
  let texto = "";
  for (let i in listaEmpresas) {
    let objPer = listaEmpresas[i];
    texto += `<option value="${objPer.numero}"> ${objPer.numero}</option>`;
  }
  document.querySelector("#idSelect2").innerHTML = texto;
}
//<<<<<<<<<<<<<<<<<<<<<<<Mostrar/Ocultar InicioDeSesion/Registro>>>>>>>>>>>>>>>>>>>>>
function MostRegistro() {
  mostrar("Registro");
  Ocultar("Login");
}
function MostInicio() {
  mostrar("Login");
  Ocultar("Registro");
}
//<<<<<<<<<<<<<<<<<<<<<<<Fin Mostrar/Ocultar InicioDeSesion/Registro>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<CONTROL IMPORTADOR//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function registrarImportador() {
  let usuario = document.querySelector("#userRegistro").value;
  let nombre = document.querySelector("#userNombreUsuario").value;
  let pass = document.querySelector("#passRegistro").value;
  let imagen = document.querySelector("#txtFile").value;
  if (estaRepetidoUsuario(usuario)) {
    alert("Usuario ya registrado.");
  } else if (!passValida(pass) || pass.length < 5) {
    alert("Formato de pass incorrecto.");
  } else {
    let imp = new Importador(usuario, nombre, imagen, pass);
    listaImportadores.push(imp);
    alert("Importador registrado correctamente");
    Ocultar("Registro")
    mostrar("Login")
  }
}

function estaRepetidoUsuario(usuario) {
  let repetido = false;
  for (let emp of listaEmpresas) {
    if (emp.usuario.toUpperCase() === usuario.toUpperCase()) {
      repetido = true;
    }
  }
  for (let imp of listaImportadores) {
    if (imp.usuario.toUpperCase() === usuario.toUpperCase()) {
      repetido = true;
    }
  }
  return repetido;
}

//<<<<<<<<<<<<<<<<<<<<<<<comprobar contrasena>>>>>>>>>>>>>>>>>>>>>>

function passValida(txt) {
  let tieneMayus = tieneMayuscula(txt);
  let tieneMinus = tieneMinuscula(txt);
  let tieneNum = tieneNumero(txt);
  let Valido = false;
  if (tieneMayus === true && tieneMinus === true && tieneNum === true) {
    Valido = true;
  }
  return Valido;
}
function tieneMayuscula(txt) {
  let tiene = false;
  for (let i = 0; i < txt.length && !tiene; i++) {
    if (txt.charCodeAt(i) >= 65 && txt.charCodeAt(i) <= 90) {
      tiene = true;
    }
  }
  return tiene;
}
function tieneMinuscula(txt) {
  let tiene = false;
  for (let i = 0; i < txt.length && !tiene; i++) {
    if (txt.charCodeAt(i) >= 97 && txt.charCodeAt(i) <= 122) {
      tiene = true;
    }
  }
  return tiene;
}
function tieneNumero(txt) {
  let tiene = false;
  for (let i = 0; i < txt.length && !tiene; i++) {
    if (txt.charCodeAt(i) >= 48 && txt.charCodeAt(i) <= 57) {
      tiene = true;
    }
  }
  return tiene;
}
//<<<<<<<<<<<<<<<<<<<<<<<<<fin comprobar contrasena>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//<<<<<<<<<<<<<<<<<<<<<<<FIN CONTROL IMPORTADOR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

//<<<<<<<<<<<<<<<<<<<<LOGIN IMPORTADOR/EMPRESA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function login() {
  let usuario = document.querySelector("#user").value;
  let pass = document.querySelector("#pass").value;
  if (loginEmpresaValido(usuario, pass)) {
    mostrar("EMPRESA");
  } else if (loginImportadorValido(usuario, pass)) {
    mostrar("IMPORTADOR");
    Ocultar("INICIAL");
    Ocultar("crearViaje");
    Ocultar("divTablaPendiente");
  } else {
    alert("Datos incorrectos.");
  }
}

function obtenerEmpresa(usuario) {
  let respuesta = null;
  for (let empresaActual of listaEmpresas) {
  }
}

function loginEmpresaValido(usuario, password) {
  let loginCorrecto = false;
  for (let i = 0; i < listaEmpresas.length && !loginCorrecto; i++) {
    let empresaActual = listaEmpresas[i];
    if (
      usuario.toUpperCase() === empresaActual.usuario.toUpperCase() &&
      password === empresaActual.pass
    ) {
      loginCorrecto = true;
    }
  }
  return loginCorrecto;
}

function loginImportadorValido(usuario, password) {
  let loginCorrecto = false;
  for (let i = 0; i < listaImportadores.length && !loginCorrecto; i++) {
    let importadorActual = listaImportadores[i];
    if (usuario.toUpperCase() === importadorActual.usuario.toUpperCase() &&password === importadorActual.pass){
      loginCorrecto = true;
    }
  }

  return loginCorrecto;
}
//<<<<<<<<<<<<<<<<<<<<Fin LOGIN IMPORTADOR/EMPRESA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<Mostrar/Ocultar Opciones del importador>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function Mostrarcrearviaje() {
  mostrar("crearViaje")
  Ocultar("InicioImportador");
}
function MosTablaPendinte() {
  mostrar("divTablaPendiente");
  Ocultar("crearViaje");
}
function VolverCrearViaje() {
  Ocultar("divTablaPendiente");
  mostrar("crearViaje");
}
//<<<<<<<<<<<<<<<Fin Mostrar/Ocultar Opciones del importador>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<Crear Viaje>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let NuevoViaje = [];
function crearviaje() {
  let TipodeCarga = document.querySelector("#idSelect").value;
  let PuertoOrigen = document.querySelector("#txtPuertoOrigen").value;
  let contenedores = parseInt(document.querySelector("#txtCantContenedores").value);
  let idEmpresa = document.querySelector("#idSelect2").value;
  let Descripcion = document.querySelector("#txtDescripcion").value;
  if (contenedores < 0 || contenedores > 1000) {
    alert("la cantidad de contenedores es invalida");
  } else {
    let Viaje = new Mercaderia(
      TipodeCarga,
      PuertoOrigen,
      contenedores,
      Descripcion,
      this.Estado = "Pendiente"
      
    );
    
    viajes.push(Viaje);
    alert("viaje creado");
    mostrarTabla(viajes, "tablaViajes", idEmpresa);
  }
}
//<<<<<<<<<<<<<<<<<<<<<<<Fin Crear Viaje>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<Mostrar tabla pendientes/Buscador Viajes/Boton de eliminar>>>>>>>>>>>>>>>>>>>>>>>>>

function mostrarTabla(listaviajes, idTablaViajes, idEmpresa) {
  let tabla = document.querySelector("#" + idTablaViajes);
  tabla.innerHTML = "";
  let idEmp = listaEmpresas.numero;
  for (let i = 0; i < listaviajes.length; i++) {
    let viaje = listaviajes[i];
    for (let i = 0; i < listaEmpresas.length; i++) {
      let idEmp = listaEmpresas[i];
      if (idEmpresa === idEmp.numero) {
        idEmp = idEmp.numero;
      }
    }

    let texto = `
         <tr>
            <td>${idEmp}</td>
            <td>${viaje.id}</td>
            <td>${viaje.Carga}</td>
            <td>${viaje.PuertoOrigen}</td>
            <td>${viaje.CantCont}</td>
            <td>${viaje.Desc}</td>
           <td><input type="button" value="X" class="btnEliminar" id="${viaje.id}-Eliminar" data-Eliminar="${viaje.id}"></td>
         </tr>`;
    tabla.innerHTML += texto;
  }
  let botonesEliminar = document.querySelectorAll(".btnEliminar");
  for (let i = 0; i < botonesEliminar.length; i++) {
    let boton = botonesEliminar[i];
    boton.addEventListener("click", EliminarViaje);
  }
}
function EliminarViaje() {
  let idEliminar = parseInt(this.id); //this en este contexto hace referencia al botón
  let indiceAEliminar = -1;
  let encontre = false;
  for (let i = 0; i < viajes.length && !encontre; i++) {
    let viaje = viajes[i];
    console.log(this.id);
    if (viaje.id === idEliminar) {
      indiceAEliminar = i;
      encontre = true;
    }
  }
  //let cantidadDeElementosAEliminar = 1;
  let confirmar = confirm(
    `¿Está seguro que quiere eliminar la solicitud de viaje ${viajes[indiceAEliminar].id}?`
  );
  console.log(confirmar);
  if (confirmar) {
    viajes.splice(indiceAEliminar, 1);
    mostrarTabla(viajes, "tablaViajes", idEmpresa);
  }
}

function BuscarPendiente() {
  let descripcion = document.querySelector("#txtBuscarPendiente").value;
  let tabla = document.querySelector("#tablaViajes")
  tabla.innerHTML = " "
  for (let i = 0; i < viajes.length; i++) {
    let viaje = viajes[i];
    if (viaje.Desc.includes(descripcion) && descripcion != "") {
      let texto = `
         <tr>
            <td>${"hola"}</td>
            <td>${viaje.id}</td>
            <td>${viaje.Carga}</td>
            <td>${viaje.PuertoOrigen}</td>
            <td>${viaje.CantCont}</td>
            <td>${viaje.Desc}</td>
           <td><input type="button" value="X" class="btnEliminar" id="${viaje.id}-Eliminar" data-Eliminar="${viaje.id}"></td>
         </tr>`;
    tabla.innerHTML += texto;;
    }
  }
}
//<<<<<<<<<<<<<<<<<<<<<<<<<Fin Mostrar tabla pendientes/Buscador Viajes/Boton de eliminar>>>>>>>>>>>>>>>>>>>>>>>>>
