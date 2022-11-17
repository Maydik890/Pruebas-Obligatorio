window.addEventListener("load", inicio);

let usuarioLogueado;

let listaEmpresas = [
    new Empresa("GuilleSA", "gga", "123"),
    new Empresa("ORT", "ort", "123"),
    
];

let listaImportadores = [
    new Importador("imp1","nombre","img", "Hola123"),
    new Importador("imp2", "nombre","img","Hola123"),
];

let solicitudes = [
     new Solicitud("Carga Peligrosa", "Buceo", "200", "Bombas", "Cancelada", 0, 1),
     new Solicitud ("Refrigerado", "Viña", "300", "Carne", "Cancelada", 0, 1),
     new Solicitud("Carga Peligrosa", "Buceo", "200", "Bombas", "Cancelada", 0, 1),
     new Solicitud ("Refrigerado", "Viña", "300", "Carne", "Pendiente", 1, 1)
];




let listaViajes = [];

function inicio() {
    document.querySelector("#btnLogin").addEventListener("click", login);
    document.querySelector("#btnMostRegistro").addEventListener("click", MostRegistro);
    document.querySelector("#btnRegistrar").addEventListener("click", registrarImportador);
    document.querySelector("#btnMostInicio").addEventListener("click", MostInicio);
    document.querySelector("#btnCrearSolicitudlogin").addEventListener("click", MostrarcrearSolicitud);
    document.querySelector("#btnCrearSolicitud").addEventListener("click", crearSolicitud);
    document.querySelector("#btnPendientes").addEventListener("click", MosTablaPendinte);
    document.querySelector("#btnBuscarPendiente").addEventListener("click", BuscarPendiente);
    document.querySelector("#txtViajeBuque").addEventListener("click", CrearViajeBuque);
    document.querySelector("#btnPendienteaMtvdeo").addEventListener("click", MosTablaAsignarSolicitud);
    document.querySelector("#btnVerViajes").addEventListener("click", TablaRollover);
    document.querySelector("#btnManifestoDeCarga").addEventListener("click", ManifiestoDeCarga);
    document.querySelector("#btnSolicitudBuque").addEventListener("click", MostCrearBuqe)
    document.querySelector("#btnMostRollover").addEventListener("click", MostRollover);
    document.querySelector("#btnPeligrosa").addEventListener("click", MostPeligrosa);
    document.querySelector("#btnHabilitarImp").addEventListener("click", MostHabilitarImp);
    document.querySelector("#btnInfoEstadistica").addEventListener("click", MostInfoEstadistica)
    cargarPersonas();
    mostrar("INICIAL");
    Ocultar("Registro");
    Ocultar("Secciones");
    Ocultar("EMPRESA");
    Ocultar("IMPORTADOR");
    CargarPrecargas()
    deshabilitarImportador()
   
}
function CargarPrecargas(){
    let idEmp;
    let idImp;
    let idSol
    for(let i = 0; i < solicitudes.length; i++){
        idSol = solicitudes[i]
        for (let i = 0; i < listaEmpresas.length; i++){
            idEmp = listaEmpresas[i]
        if(idEmp.numero === idSol.idEmpresa){
    idEmp.agregarSolicitud(idSol)
}}
for (let i = 0; i < listaImportadores.length; i++){
    idImp = listaImportadores[i]
if(idImp.numero === idSol.idImportador){
idImp.agregarSolicitudImp(idSol)
}}}
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
        for (let i = 0; i < listaEmpresas.length; i++) {
            let empresa = listaEmpresas[i];
            if (usuario === empresa.usuario && pass === empresa.pass) {

                usuarioLogueado = empresa;
            } 
        }
        mostrar("CrearSolicitudEmpresa")
        Ocultar("ManifiestoDeCarga")
        Ocultar("AsignarSolicitud")
        Ocultar("Rollover")
        mostrar("Secciones")
        mostrar("EMPRESA");
        mostrar("navEmpresa")
        Ocultar("navImportador")
        Ocultar("INICIAL")
        Ocultar("AsignarSolicitud")
        Ocultar("CargaPeligrosa")
        Ocultar("HabilitarImp")
        Ocultar("aux")
    } else if (loginImportadorValido(usuario, pass)) {
        for (let i = 0; i < listaImportadores.length; i++) {
            let importador = listaImportadores[i];
            if (usuario === importador.usuario && pass === importador.pass) {

                usuarioLogueado = importador;
            }

            mostrar("IMPORTADOR");
            mostrar("Secciones");
            Ocultar("navEmpresa")
            Ocultar("INICIAL");
            mostrar("crearSolicitud")
            Ocultar("divTablaPendiente");
            Ocultar("InformacionEstadistica")
            Ocultar("aux")
        }
    } else {
        alert("Datos incorrectos.");
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
        if (usuario.toUpperCase() === importadorActual.usuario.toUpperCase() && password === importadorActual.pass) {
            loginCorrecto = true;
        }
    }

    return loginCorrecto;
}
//<<<<<<<<<<<<<<<<<<<<Fin LOGIN IMPORTADOR/EMPRESA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<Mostrar/Ocultar Opciones del importador>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function MostrarcrearSolicitud() {
    mostrar("crearSolicitud");
    Ocultar("divTablaPendiente");
    Ocultar("InicioImportador");
    Ocultar("InformacionEstadistica");
    deshabilitarImportador()
   
}

function MosTablaPendinte() {
    mostrar("divTablaPendiente");
    Ocultar("crearSolicitud");
    Ocultar("InformacionEstadistica")
    deshabilitarImportador();
    mostrarTabla();
}
//<<<<<<<<<<<<<<<Fin Mostrar/Ocultar Opciones del importador>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function MostCrearBuqe(){
    mostrar("CrearSolicitudEmpresa")
    Ocultar("ManifiestoDeCarga")
    Ocultar("AsignarSolicitud")
    Ocultar("Rollover")
    Ocultar("CargaPeligrosa")
    Ocultar("HabilitarImp")
}
function CrearViajeBuque() {
    let NombreBuque = document.querySelector("#txtNombreBuque").value;
    let CantidadMaxCont = parseInt(document.querySelector("#txtCantidadContenedores").value);
    let FechaLlegada = document.querySelector("#txtFecha").value;
    let indiceEmpresa = "";
        let viaje = listaViajes;
        let ViajeBuque = new CrearViaje(
            NombreBuque,
            CantidadMaxCont,
            FechaLlegada
        );
        
        
     
        ViajeBuque.agregarViajeEmp(usuarioLogueado);
        
        viaje.push(ViajeBuque);
        alert("Solicitud creado");
        mostrarTabla(solicitudes);
        
        cargarViaje();
       
    

}
function cargarViajeAsignar(){
    let texto = "";
    for (let i in listaViajes) {
        let objAsignarViaje = listaViajes[i];
        texto += `<option value="${objAsignarViaje.Automatico}"> ${objAsignarViaje.Automatico}</option>`;
    }
    document.querySelector("#SelectAsignarViaje").innerHTML = texto;
}
function MosTablaAsignarSolicitud(){
    TablaAsignarSolicitud();
    mostrar("AsignarSolicitud")
    Ocultar("ManifiestoDeCarga")
    Ocultar("CrearSolicitudEmpresa")
    Ocultar("Rollover")
    Ocultar("CargaPeligrosa")
    Ocultar("HabilitarImp")
}
function TablaAsignarSolicitud() {
    let tabla = document.querySelector("#tablaAsignarSolicitudes");
    tabla.innerHTML = "";

    for (let i = 0; i < solicitudes.length; i++) {
        let Solicitud = solicitudes[i];


        if (Solicitud.Estado === "Pendiente" && Solicitud.idEmpresa === usuarioLogueado.numero) {
            let IDv="";
            for(let i = 0; i<listaViajes.length; i++){
             
             let ObjViaje = listaViajes[i]
             IDv += `<option id=${ObjViaje.Automatico}>${ObjViaje.Automatico}</option>`
            }
            let texto = `
         <tr>
            <td>${Solicitud.id}</td>
            <td>${Solicitud.Carga}</td>
            <td>${Solicitud.PuertoOrigen}</td>
            <td>${Solicitud.CantCont}</td>
            <td>${Solicitud.Desc}</td>
            <td> <select id="SelectAsignarViaje">${IDv}</select></td>
           <td><input type="button" value="Asignar" class="btnAsignar" id="${Solicitud.id}-Eliminar" data-Eliminar="${Solicitud.id}"></td>
         </tr>`;
            tabla.innerHTML += texto;
        
        }
        mostrar("AsignarSolicitud")
    }
    let botonesAsignar = document.querySelectorAll(".btnAsignar");
    for (let i = 0; i < botonesAsignar.length; i++) {
        let boton = botonesAsignar[i];
        boton.addEventListener("click", AsignarSolicitud);
    }
}
function AsignarSolicitud() {
    let IdViaje = parseInt(document.querySelector("#SelectAsignarViaje").value)
    let numeroContenido = parseInt(this.id);
    let sigoBuscado = true;
    ;
    for (let i = 0; i < solicitudes.length && sigoBuscado; i++) {
        let objsolicitudes = solicitudes[i];
        if (objsolicitudes.id === numeroContenido) {
            objsolicitudes.Estado = "Confirmada"
            sigoBuscado = false;
            for(let i = 0; i<listaViajes.length; i++){
                let viaje = listaViajes[i];
               if(viaje.Automatico === IdViaje){
            viaje.agregarSolicitud(objsolicitudes);
        }}}
    }
    
    TablaAsignarSolicitud();
}
function cargarViaje() {
    let texto = "";
    for (let i in listaViajes) {
        let objVia = listaViajes[i];
        texto += `<option value="${objVia.Automatico}"> ${objVia.Automatico}</option>`;
    }
    document.querySelector("#slcVerViajes").innerHTML = texto;
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Rollover>>>>>>>>>>>>>>>>>>>>>>>
function MostRollover(){
    TablaRollover()
    mostrar("Rollover")
    Ocultar("ManifiestoDeCarga")
    Ocultar("AsignarSolicitud")
    Ocultar("CrearSolicitudEmpresa")
    Ocultar("CargaPeligrosa")
    Ocultar("HabilitarImp")
}
function TablaRollover() {
    let tabla = document.querySelector("#tablaRollover");
    tabla.innerHTML = "";
    
    let idViaje = parseInt(document.querySelector("#slcVerViajes").value)
   

    for (let i = 0; i < listaViajes.length; i++) {
        let Viajes = listaViajes[i];
        let indiceSoli;
        for(let i = 0; i<Viajes.solicitudes.length; i++){
            indiceSoli = Viajes.solicitudes[i]
        
            
    
        if (Viajes.Automatico === idViaje) {
            let IDv="";
            for(let i = 0; i<listaViajes.length; i++){
             
             let ObjViaje = listaViajes[i]
             
             IDv += `<option id=${ObjViaje.Automatico}>${ObjViaje.Automatico}</option>`}
            
            let texto = `
         <tr>
            <td>${indiceSoli.CantCont}</td>
            <td>${indiceSoli.Desc}</td>
            <td>${indiceSoli.Carga}</td>
            <td>${indiceSoli.id}</td>
            <td>${indiceSoli.PuertoOrigen}</td>
            <td> <select id="SelectRollearViaje">${IDv}</select></td>
            <td><input type="button" value="Asignar" class="btnRollover" id="${indiceSoli.id}-Eliminar" data-Eliminar="${indiceSoli.id}"></td>
         </tr>`;
            tabla.innerHTML += texto;
        
        }}
        
    }
     let botonesAsignar = document.querySelectorAll(".btnRollover");
     for (let i = 0; i < botonesAsignar.length; i++) {
         let boton = botonesAsignar[i];
         boton.addEventListener("click", Rollover);
     }
            
}
 function Rollover() { 
     let IdViaje = parseInt(document.querySelector("#SelectRollearViaje").value)
     let numeroContenido = parseInt(this.id);
     let pos = -1;
     let ElementosAEliminar=1
     ;
     for (let i = 0; i < listaViajes.length && pos === -1; i++) {
         let objviajes = listaViajes[i];
         let objsoli;

         for (let i = 0; i < objviajes.solicitudes.length ; i++){
             objsoli = objviajes.solicitudes[i]
            if( objsoli.id === numeroContenido){
                pos = [i]  
             let respuesta = confirm("¿Está seguro de Rollear la solicitud?");
    if (respuesta) {
        objviajes.solicitudes.splice(pos, ElementosAEliminar);
        TablaRollover()
        for(let i = 0; i<listaViajes.length; i++){
            let viaje = listaViajes[i];
            if(viaje.Automatico === IdViaje){
         viaje.agregarSolicitud(objsoli);
     }}
    }
             
     }}}}
     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Fin Rollover>>>>>>>>>>>>>>>>>>>>>>>
     function ManifiestoDeCarga() {
        let tabla = document.querySelector("#tablaManifiesto");
        tabla.innerHTML = "";
    
        for (let i = 0; i < solicitudes.length; i++) {
            let Solicitud = solicitudes[i];
    
    
            if (Solicitud.Estado === "Confirmada" && Solicitud.idEmpresa === usuarioLogueado.numero) {
            
                let texto = `
             <tr>
                <td>${Solicitud.PuertoOrigen}</td>
                <td>${Solicitud.CantCont}</td>
                <td>${Solicitud.idImportador}</td>
                <td>${Solicitud.Desc}</td>
                <td>${Solicitud.Carga}</td>
             </tr>`;
                tabla.innerHTML += texto;
            
            }
            mostrar("ManifiestoDeCarga")
            Ocultar("Rollover")
            Ocultar("AsignarSolicitud")
            Ocultar("CrearSolicitudEmpresa")
            Ocultar("CargaPeligrosa")
            Ocultar("HabilitarImp")
        }}
        function MostPeligrosa() {
            let tabla = document.querySelector("#tablaPeligrosa");
            tabla.innerHTML = "";
        
            for (let i = 0; i < solicitudes.length; i++) {
                let Solicitud = solicitudes[i];
        
        
                if (Solicitud.Estado === "Confirmada" && Solicitud.idEmpresa === usuarioLogueado.numero && Solicitud.Carga === "Carga Peligrosa") {
                    for(let i = 0; i<listaViajes.length; i++){
                     
                    let texto = `
                 <tr>
                    <td>${Solicitud.PuertoOrigen}</td>
                    <td>${Solicitud.CantCont}</td>
                    <td>${Solicitud.idImportador}</td>
                    <td>${Solicitud.Desc}</td>
                    <td>${Solicitud.Carga}</td>
                 </tr>`;
                    tabla.innerHTML += texto;
                
                }
                
        }}  mostrar("CargaPeligrosa")
            Ocultar("ManifiestoDeCarga")
            Ocultar("Rollover")
            Ocultar("AsignarSolicitud")
            Ocultar("CrearSolicitudEmpresa")
            Ocultar("HabilitarImp")
        }
        
            function MostHabilitarImp(){
                HabilitarImp()
                mostrar("HabilitarImp")
                Ocultar("CargaPeligrosa")
                Ocultar("ManifiestoDeCarga")
                Ocultar("Rollover")
                Ocultar("AsignarSolicitud")
                Ocultar("CrearSolicitudEmpresa")

            }
function HabilitarImp(){
                let tabla = document.querySelector("#tablaHabilitar");
                tabla.innerHTML = ""
   

    for (let i = 0; i < listaImportadores.length; i++) {
        let Importador = listaImportadores[i];
        if(Importador.Estado === false){
            let texto = `
         <tr>
            <td>${Importador.numero}</td>
            <td>${Importador.usuario}</td>
            <td>${Importador.imagen}</td>
            <td><input type="button" value="Habilitar" class="btnHabilitar" id="${Importador.numero}-Eliminar" data-Eliminar="${Importador.numero}"></td>
         </tr>`;
            tabla.innerHTML += texto;
        
        }}
        
    
     let botonesAsignar = document.querySelectorAll(".btnHabilitar");
     for (let i = 0; i < botonesAsignar.length; i++) {
         let boton = botonesAsignar[i];
         boton.addEventListener("click", Habilitar);
     }}
    
     function Habilitar() { 
        let numeroContenido = parseInt(this.id);
        ;
        for (let i = 0; i < listaImportadores.length; i++) {
            let objImportador = listaImportadores[i];
            let objsoli;
   
            for (let i = 0; i < objImportador.solicitudes.length ; i++){
                objsoli = objImportador.solicitudes[i]
               if( objsoli.Estado === "Cancelada" && objsoli.id === numeroContenido){
                let respuesta = confirm("¿Está seguro de Habilitar?");
       if (respuesta) {
           objsoli.Estado = "Ignorada"
           objImportador.Estado = true
           HabilitarImp()

               

        }}
       }
                
        }}



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
        let empresa = listaEmpresas[idEmpresa]
        let Solicitudes = new Solicitud(
            TipodeCarga,
            PuertoOrigen,
            contenedores,
            Descripcion,
            this.Estado = "Pendiente",
            this.idEmpresa = idEmpresa,
            this.idImportador= usuarioLogueado.numero

        );
        empresa.agregarSolicitud(Solicitudes);
        usuarioLogueado.agregarSolicitudImp(Solicitudes);
        solicitudes.push(Solicitudes);
        alert("Solicitud creado");
        mostrarTabla();
        deshabilitarImportador()
    }
}
//<<<<<<<<<<<<<<<<<<<<<<<Fin Crear Solicitud>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<Mostrar tabla pendientes/Buscador Solicituds/Boton de eliminar>>>>>>>>>>>>>>>>>>>>>>>>>

function mostrarTabla() {
    let tabla = document.querySelector("#tablaSolicitudes");
    tabla.innerHTML = "";
    
    for (let i = 0; i < solicitudes.length; i++) {
        let Solicitud = solicitudes[i];


        if (Solicitud.Estado === "Pendiente" && Solicitud.idImportador === usuarioLogueado.numero) {
            let texto = `
         <tr>
            <td>${Solicitud.idEmpresa}</td>
            <td>${Solicitud.id}</td>
            <td>${Solicitud.Carga}</td>
            <td>${Solicitud.PuertoOrigen}</td>
            <td>${Solicitud.CantCont}</td>
            <td>${Solicitud.Desc}</td>
           <td><input type="button" value="X" class="btnEliminar" id="${Solicitud.id}-Eliminar" data-Eliminar="${Solicitud.id}" ></td>
         </tr>`;
            tabla.innerHTML += texto;
        }

    }
    let botonesEliminar = document.querySelectorAll(".btnEliminar");
    for (let i = 0; i < botonesEliminar.length; i++) {
        let boton = botonesEliminar[i];
        boton.addEventListener("click", EliminarSolicitud);
    }
    deshabilitarImportador()
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
    if(usuarioLogueado)
    actualizarTabla();
    deshabilitarImportador();
}

function actualizarTabla() {
    let tabla = document.querySelector("#tablaSolicitudes");
    tabla.innerHTML = ""
    for (let i = 0; i < solicitudes.length; i++) {
        let Solicitud = solicitudes[i];
        if (Solicitud.Estado === "Pendiente" && Solicitud.idImportador === usuarioLogueado.numero) {
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
    }

}

function BuscarPendiente() {
    let descripcion = document.querySelector("#txtBuscarPendiente").value;
    let tabla = document.querySelector("#tablaSolicitudes")
    tabla.innerHTML = " "
    for (let i = 0; i < solicitudes.length; i++) {
        let Solicitud = solicitudes[i];
        if (Solicitud.Desc.includes(descripcion) && descripcion != "" && Solicitud.Estado === "Pendiente") {
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
            tabla.innerHTML += texto;;
        }
    }
    deshabilitarImportador()
}
//<<<<<<<<<<<<<<<<<<<<<<<<<Fin Mostrar tabla pendientes/Buscador Solicituds/Boton de eliminar>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<Info Estadistica>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function MostInfoEstadistica(){
    mostrar("InformacionEstadistica")
    Ocultar("crearSolicitud")
    Ocultar("divTablaPendiente")
    Ocultar("InicioImportador");
    Estadisticas()
}
function Estadisticas(){
    let texto=document.querySelector("#pCancelaciones")
    let Imp;
    let Soli;
    for (let i = 0; i < listaImportadores.length; i++){
     Imp = listaImportadores[i]
     let Cancelada=0
     let Resto=0
     for(let i = 0; i < Imp.solicitudes.length; i++){
        Soli=Imp.solicitudes[i]
        if(Soli.Estado === "Cancelada"){
            Cancelada++
        }
        else{
            Resto++
        }
     }
     let cuenta = Cancelada/(Resto+Cancelada)
     let Porcentaje = cuenta*100
     texto.innerHTML = Porcentaje + "%"
     tablaEstadistica()
    }
}
function tablaEstadistica(){
    let tabla = document.querySelector("#tablaEstadistica");
    tabla.innerHTML = ""
    for (let i = 0; i < solicitudes.length; i++) {
        let Solicitud = solicitudes[i];
        if (Solicitud.idImportador === usuarioLogueado.numero) {
            let texto = `
         <tr>
            <td>${}</td>
            <td>${}</td>
         </tr>`;
            tabla.innerHTML += texto;
        }
     
    }
}
//<<<<<<<<<<<<<<<<<<<<<<<<<Fin Info Estadistica>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<Deshabilita al importador>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function deshabilitarImportador(){
    let Imp;
    let importador;
    
    
    for(let i = 0; i < listaImportadores.length; i++){
        importador = listaImportadores[i]
        Imp = listaImportadores[i].solicitudes;
        let Soli;
        let Canceladas = 0
        for(let i = 0; i < Imp.length; i++){
            Soli = Imp[i]
           
            if(Soli.Estado === "Cancelada"){
                Canceladas++;
                if(Canceladas>=3){
                    importador.Estado = false
                        document.getElementById("btnCrearSolicitud").disabled = true
                        let botones = document.getElementsByClassName("btnEliminar")
                        for(let i = 0; i<botones.length; i++)
                        botones[i].disabled = true
                }
            }
    }
       
    }
        }