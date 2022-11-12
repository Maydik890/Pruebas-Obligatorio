let idEmpresa = 0;
class Empresa {
  constructor(nombreEmpresa, usuario, pass) {
    this.numero = idEmpresa++;
    this.nombreEmpresa = nombreEmpresa;
    this.usuario = usuario;
    this.pass = pass;
    this.solicitudes = []
  }
  agregarSolicitud(unaSolicitud){
    this.solicitudes.push(unaSolicitud)
  }
}
let idImportador = 0;
class Importador {
  constructor(usuario, nombre, imagen, pass) {
    this.numero = idImportador++;
    this.usuario = usuario;
    this.nombre = nombre;
    this.imagen = imagen;
    this.pass = pass;
    this.solicitudes = []
  }
  agregarSolicitudImp(unaSolicitud){
    this.solicitudes.push(unaSolicitud)
  }
}


let idViaje = 0;
class Solicitud {
  constructor(TipodeCarga, PuertoOrigen, CantidadContenedores, Descripcion, Estado, Empresa) {
    this.id = idViaje++;
    this.Carga = TipodeCarga;
    this.Desc = Descripcion;
    this.PuertoOrigen = PuertoOrigen;
    this.CantCont = CantidadContenedores;
    this.Estado = Estado;
    this.idEmpresa = Empresa
  }
  
    
  }

