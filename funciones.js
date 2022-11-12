window.addEventListener("load", inicio);

let usuarioLogueado;

let listaEmpresas = [
  new Empresa("GuilleSA", "gga", "123"),
  new Empresa("ORT", "ort", "123"),
];

let listaImportadores = [
  new Importador("imp1", "123"),
  new Importador("imp2", "123"),
];

let solicitudes = [];

function inicio() {
  document.querySelector("#btnLogin").addEventListener("click", login);
  document.querySelector("#btnMostRegistro").addEventListener("click", MostRegistro);
  document.querySelector("#btnRegistrar").addEventListener("click", registrarImportador);
  document.querySelector("#btnMostInicio").addEventListener("click", MostInicio);
  document.querySelector("#btnCrearSolicitudlogin").addEventListener("click", MostrarcrearSolicitud);
  document.querySelector("#btnCrearSolicitud").addEventListener("click", crearSolicitud);
  document.querySelector("#btnPendientes").addEventListener("click", MosTablaPendinte);
  document.querySelector("#btnBuscarPendiente").addEventListener("click", BuscarPendiente);
  cargarPersonas();
  mostrar("INICIAL");
  Ocultar("Registro");
  Ocultar("Secciones");
  Ocultar("EMPRESA");
  Ocultar("IMPORTADOR");
}


function cargarPersonas() {
  let texto = "";
  for (let i in listaEmpresas) {
    let objEmp = listaEmpresas[i];
    texto += `<option value="${objEmp.numero}"> ${objEmp.nombreEmpresa}</option>`;
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
    Ocultar("INICIAL")
  } else if (loginImportadorValido(usuario, pass)) {
    mostrar("IMPORTADOR");
    mostrar("Secciones")
    Ocultar("INICIAL");
    mostrar("crearSolicitud")
    Ocultar("divTablaPendiente");
    
    Ocultar("aux")
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
function MostInicioImportador(){
  Ocultar("crearSolicitud")
  mostrar("InicioImportador")
}

function MostrarcrearSolicitud() {
  mostrar("crearSolicitud")
  Ocultar("divTablaPendiente")
  Ocultar("InicioImportador");
}
function MosTablaPendinte() {
  mostrar("divTablaPendiente");
  Ocultar("crearSolicitud");
}
//<<<<<<<<<<<<<<<Fin Mostrar/Ocultar Opciones del importador>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<Crear Solicitud>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function crearSolicitud() {
  let TipodeCarga = document.querySelector("#idSelect").value;
  let PuertoOrigen = document.querySelector("#txtPuertoOrigen").value;
  let contenedores = parseInt(document.querySelector("#txtCantContenedores").value);
  let idEmpresa = document.querySelector("#idSelect2").value;
  let Descripcion = document.querySelector("#txtDescripcion").value;
  if (contenedores < 0 || contenedores > 1000 && PuertoOrigen === "" && Descripcion === "") {
    alert("la cantidad de contenedores es invalida");
  } else {
    let importador = listaImportadores[numero]
    let empresa = listaEmpresas[idEmpresa]
    let Solicitudes = new Solicitud(
      TipodeCarga,
      PuertoOrigen,
      contenedores,
      Descripcion,
      this.Estado = "Pendiente",
      this.idEmpresa = idEmpresa
      
    );
    empresa.agregarSolicitud(Solicitudes);
    importador.agregarSolicitudImp(Solicitudes);
    solicitudes.push(Solicitudes);
    alert("Solicitud creado");
    mostrarTabla(solicitudes);
  }
}
//<<<<<<<<<<<<<<<<<<<<<<<Fin Crear Solicitud>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<Mostrar tabla pendientes/Buscador Solicituds/Boton de eliminar>>>>>>>>>>>>>>>>>>>>>>>>>

function mostrarTabla(listaSolicituds) {
  let tabla = document.querySelector("#tablaSolicitudes");
  tabla.innerHTML = "";
  let idEmp = listaEmpresas
  for (let i = 0; i < listaSolicituds.length; i++) {
    let Solicitud = listaSolicituds[i];
    
    
    if(Solicitud.Estado === "Pendiente"){
    let texto = `
         <tr>
            <td>${Solicitud.idEmpresa}</td>
            <td>${Solicitud.id}</td>
            <td>${Solicitud.Carga}</td>
            <td>${Solicitud.PuertoOrigen}</td>
            <td>${Solicitud.CantCont}</td>
            <td>${Solicitud.Desc}</td>
           <td><input type="button" value="X" class="btnEliminar" id="${Solicitud.id}-Eliminar" data-Eliminar="${Solicitud.id}"></td>
         </tr>`;
    tabla.innerHTML += texto;
  }}
  let botonesEliminar = document.querySelectorAll(".btnEliminar");
  for (let i = 0; i < botonesEliminar.length; i++) {
    let boton = botonesEliminar[i];
    boton.addEventListener("click", EliminarSolicitud);
  }
}
function EliminarSolicitud() {
  let numeroContenido = parseInt(this.id);
  let sigoBuscado = true;
  for (let i = 0; i < solicitudes.length && sigoBuscado; i++) {
      let objsolicitudes = solicitudes[i];
      if (objsolicitudes.id === numeroContenido) {
          objsolicitudes.Estado = "Cancelada"
          sigoBuscado = false;
      }
  }
 actualizarTabla()
  ;
}

function actualizarTabla(){
  let tabla = document.querySelector("#tablaSolicitudes");
  tabla.innerHTML = ""
  for (let i = 0; i < solicitudes.length; i++) {
    let Solicitud = solicitudes[i];
  if(Solicitud.Estado === "Pendiente"){
    let texto = `
         <tr>
            <td>${Solicitud.empresa}</td>
            <td>${Solicitud.id}</td>
            <td>${Solicitud.Carga}</td>
            <td>${Solicitud.PuertoOrigen}</td>
            <td>${Solicitud.CantCont}</td>
            <td>${Solicitud.Desc}</td>
           <td><input type="button" value="X" class="btnEliminar" id="${Solicitud.id}-Eliminar" data-Eliminar="${Solicitud.id}"></td>
         </tr>`;
    tabla.innerHTML += texto;
  }
  let botonesEliminar = document.querySelectorAll(".btnEliminar");
  for (let i = 0; i < botonesEliminar.length; i++) {
    let boton = botonesEliminar[i];
    boton.addEventListener("click", EliminarSolicitud);
  }
}}

function BuscarPendiente() {
  let descripcion = document.querySelector("#txtBuscarPendiente").value;
  let tabla = document.querySelector("#tablaSolicitudes")
  tabla.innerHTML = " "
  for (let i = 0; i < Solicitudes.length; i++) {
    let Solicitud = Solicitudes[i];
    if (Solicitud.Desc.includes(descripcion) && descripcion != "") {
      let texto = `
         <tr>
            <td>${"hola"}</td>
            <td>${Solicitud.id}</td>
            <td>${Solicitud.Carga}</td>
            <td>${Solicitud.PuertoOrigen}</td>
            <td>${Solicitud.CantCont}</td>
            <td>${Solicitud.Desc}</td>
           <td><input type="button" value="X" class="btnEliminar" id="${Solicitud.id}-Eliminar" data-Eliminar="${Solicitud.id}"></td>
         </tr>`;
    tabla.innerHTML += texto;;
    }
  }
}
//<<<<<<<<<<<<<<<<<<<<<<<<<Fin Mostrar tabla pendientes/Buscador Solicituds/Boton de eliminar>>>>>>>>>>>>>>>>>>>>>>>>>
