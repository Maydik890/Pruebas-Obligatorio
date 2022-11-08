


let idEmpresa = 1;
class Empresa{
    constructor(nombreEmpresa, usuario, pass){
        this.numero = idEmpresa++;
        this.nombreEmpresa = nombreEmpresa;
        this.usuario = usuario;
        this.pass = pass;
    }
}
let idImportador = 1;
class Importador { 
    constructor(usuario, nombre, imagen, pass){
        this.numero = idImportador++;
        this.usuario = usuario;
        this.nombre = nombre;
        this.imagen = imagen;
        this.pass = pass;
    }
}

 class Mercaderia {
     constructor(TipodeCarga, PuertoOrigen, CantidadContenedores, Descripcion){
         this.Carga = TipodeCarga
         this.Desc = Descripcion
         this.PuertoOrigen = PuertoOrigen
         this.CantCont = CantidadContenedores
        
     }

 }

 