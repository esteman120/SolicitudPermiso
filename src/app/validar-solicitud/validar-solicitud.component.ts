import { Component, OnInit, Compiler } from '@angular/core';
import { ItemAddResult, EmailProperties } from '@pnp/sp';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SPServicio } from '../Servicios/sp-servicio';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Usuario } from '../Entidades/usuario';
import { Solicitud } from '../Entidades/solicitud';
import { debug } from 'util';
import { ActivatedRoute } from '@angular/router';
import SimpleCrypto from "simple-crypto-js";
import * as CryptoJS from 'crypto-js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-validar-solicitud',
  templateUrl: './validar-solicitud.component.html',
  styleUrls: ['./validar-solicitud.component.css']
})
export class ValidarSolicitudComponent implements OnInit {

  SolicitudPermisoForm: FormGroup;
  usuarioActual: Usuario;
  otroTipoPermiso: boolean;

  hora: string[] = [ "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", 
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00","10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", 
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
  TipoPermiso: any;
  minDateFechaInicio: Date;
  minDateFechaFin: Date;
  ObjSolicitud: Solicitud[];
  AprobarJefe: boolean;
  idSolicitud: string;
  IdServicio: any;
  RecepcionGH: boolean;
  EmailSolicitante: string;
  UsuarioHG: boolean;
  ComentarioGH: boolean;
  MensajeAccion: string;
  objUsuariosGH: any[]=[];
  empresa: string;

  constructor( 
    private formBuilder: FormBuilder, 
    public toastr: ToastrManager,     
    private spinnerService: Ng4LoadingSpinnerService,
    private servicio: SPServicio,
    private route: ActivatedRoute,
    private compilador: Compiler) { 
    this.compilador.clearCache(); 
    this.otroTipoPermiso = false;
    this.TipoPermiso = "";
    this.minDateFechaInicio = new Date();
    this.AprobarJefe = false;
    this.RecepcionGH = false;
    this.ComentarioGH = false;
  }

  ngOnInit() {
    this.spinnerService.show();     
    
    this.SolicitudPermisoForm = this.formBuilder.group({
      Apellidos: [''],
      Nombres: [''],
      Cedula: [''],
      CargoRol: [''],
      UnidadNegocio: [''],
      TelefonoExt: [''],
      TipoPermiso: ["", Validators.required],
      OtroMotivo: [""],
      MotivoPermiso: ["", Validators.required],
      HoraInicio: ["", Validators.required],
      FechaInicio: ["", Validators.required],
      HoraFin: ["", Validators.required],
      FechaFin: ["", Validators.required],
      ObservacionGH: [""]
    });      
    
    this.ObtenerUsuarioActual();
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      async (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Id);
        await this.obtenerUsuarioEmpresa(respuesta.Id);        
        await this.ValidarUsuarioGH()
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  }

  async obtenerUsuarioEmpresa(id: number) {
    await this.servicio.obtenerUsuarioListaEmpleados(id).then(
      (respuesta) => {
        this.empresa = respuesta[0].Empresa
      }
    )
  }

  async ValidarUsuarioGH(){
    await this.servicio.ObtenerUsuarioGH(this.empresa).then(
      (res)=>{
        let objUsuariosGH = [];
        this.objUsuariosGH.push({id: res[0].GestionHumanaId, email: res[0].GestionHumana[0].EMail })
        let usuarioGH = this.objUsuariosGH[0].id.filter(x=> x === this.usuarioActual.idUsuario);
        if (usuarioGH.length > 0) {
            this.UsuarioHG = true;
        }
        else{
          this.UsuarioHG = false;
        }
        this.consultarSolicitudPermiso();
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al cargar las solicitudes");
        this.spinnerService.hide();
      }
    ) 
  }

  getParams(url){
    let params = {};
  	let parser = document.createElement('a');
  	parser.href = url;
  	let query = parser.search.substring(1);
  	let vars = query.split('&');
  	for (let i = 0; i < vars.length; i++) {
  		let pair = vars[i].split('=');
  		params[pair[0]] = decodeURIComponent(pair[1]);
  	}
  	return params;
  }

  consultarSolicitudPermiso(): any {    

    let Parametro = this.getParams(window.location.href);    
    this.idSolicitud = Parametro["id"].substring(12, Parametro["id"].length);

    if (this.idSolicitud === null || this.idSolicitud === "") {
      this.mostrarError("Error al cargar la solicitud");
      setTimeout(
        ()=>{
          this.spinnerService.hide();
        },2000);
    }
    this.servicio.consultarSolicitudPermiso(this.idSolicitud).then(
      (respuesta)=>{        
        this.ObjSolicitud = Solicitud.fromJsonList(respuesta);
        this.SolicitudPermisoForm.controls["TipoPermiso"].setValue(this.ObjSolicitud[0].tipoPermiso);
        this.SolicitudPermisoForm.controls["OtroMotivo"].setValue(this.ObjSolicitud[0].otroTipoPermiso);      
        this.SolicitudPermisoForm.controls["MotivoPermiso"].setValue(this.ObjSolicitud[0].motivoPermiso);
        this.SolicitudPermisoForm.controls["HoraInicio"].setValue(this.ObjSolicitud[0].horaInicioPermiso);
        this.SolicitudPermisoForm.controls["FechaInicio"].setValue(this.ObjSolicitud[0].fechaInicioPermiso);
        this.SolicitudPermisoForm.controls["HoraFin"].setValue(this.ObjSolicitud[0].horaFinPermiso);
        this.SolicitudPermisoForm.controls["FechaFin"].setValue(this.ObjSolicitud[0].fechaFinPermiso);
        this.SolicitudPermisoForm.controls["ObservacionGH"].setValue(this.ObjSolicitud[0].ObservacionGH);
        this.EmailSolicitante = this.ObjSolicitud[0].EmailSolicitante;
        // let actualUser = this.ObjSolicitud[0].responsableActual.find(x=> x === this.usuarioActual.idUsuario);
        // console.log(actualUser);
        if (this.ObjSolicitud[0].tipoPermiso === "Otro") {
          this.otroTipoPermiso = true;
        }
        if (this.ObjSolicitud[0].estado === "En revision GH" && this.UsuarioHG === true) {
          this.RecepcionGH = true;
          this.ComentarioGH = true;                      
        }

        if (this.ObjSolicitud[0].estado === "Recibido por GH") {          
            this.ComentarioGH = true;
            this.SolicitudPermisoForm.controls["ObservacionGH"].disable();
        }

        if (this.ObjSolicitud[0].estado === "En revision jefe" && (this.usuarioActual.idUsuario === this.ObjSolicitud[0].responsableActual)) {
          this.AprobarJefe = true;
        }        
        
        this.ObtenerSolicitante(this.ObjSolicitud[0].idUsuario);
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al cargar la solicitud");
      }
    );    
  }

  ObtenerSolicitante(idSolicitante: any): any {
    this.servicio.obtenerUsuarioListaEmpleados(idSolicitante).then(
      (res)=>{
        
        if (res.length > 0) { 
                              
          let SegundoNombre = res[0].SegundoNombre === null? "" : " "+res[0].SegundoNombre;
          let SegundoApellido = res[0].SegundoApellido === null? "" : " "+res[0].SegundoApellido;
          let nombre = res[0].PrimerNombre + SegundoNombre;
          let apellidos = res[0].PrimerApellido + SegundoApellido;
          let cedula = res[0].NumeroDocumento === null? "" :res[0].NumeroDocumento;
          let cargo = res[0].Cargo === null? "" : res[0].Cargo;
          let Area = res[0].Area === null? "" : res[0].Area;
          let celular = res[0].Celular === null? "" : res[0].Celular;

          this.SolicitudPermisoForm.controls["Apellidos"].setValue(apellidos);
          this.SolicitudPermisoForm.controls["Nombres"].setValue(nombre);
          this.SolicitudPermisoForm.controls["Cedula"].setValue(cedula);
          this.SolicitudPermisoForm.controls["CargoRol"].setValue(cargo);
          this.SolicitudPermisoForm.controls["UnidadNegocio"].setValue(Area);
          this.SolicitudPermisoForm.controls["TelefonoExt"].setValue(celular);
          
          this.servicio.ObtenerServicio(this.idSolicitud).then(
            (resServicio)=>{
              this.IdServicio = resServicio[0].Id;
              this.spinnerService.hide();
            }            
          ).catch(
            (error)=>{
              console.log(error);
              this.mostrarError("Error al obtener la solicitud");
              // window.location.reload();
            }
          );          
        }        
      }
    ).catch(
      (error)=>{
          console.log(error);
      }
    );
  }
  
  MostrarExitoso(mensaje: string) {
    this.toastr.successToastr(mensaje, 'Confirmación!');
  }

  mostrarError(mensaje: string) {
    this.toastr.errorToastr(mensaje, 'Oops!');
  }

  mostrarAdvertencia(mensaje: string) {
    this.toastr.warningToastr(mensaje, 'Validación');
  }

  mostrarInformacion(mensaje: string) {
    this.toastr.infoToastr(mensaje, 'Información importante');
  }
   
  async AprobarSolicitud(){
    this.spinnerService.show(); 
    let fecha = new Date();
    let hora = fecha.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    let ObjRespuestaJefe = {
      HoraAprobacionLider: hora,
      FechaAprobacionLider: fecha,
      AprobacionLider: true,
      Estado: "En revision GH",
      ResponsableActualId: this.objUsuariosGH[0].id[0]
    }

    this.MensajeAccion = "La solicitud se ha aprobado con éxito";

    let respu = await this.GuardarRespuestaJefe(ObjRespuestaJefe);

    if (!respu.resp) {
      this.spinnerService.hide();
      return false;
    }

    let objServicio = {          
      ResponsableActualId: this.objUsuariosGH[0].id[0],
      Estado: "En revision GH"
    }

    let respServ = await this.guardarServicio(objServicio);  

    
    this.enviarNotificacion("Aprobada");
    
  }

  async GuardarRespuestaJefe(ObjRespuestaJefe): Promise<any> {
    let resp;
    await this.servicio.GuardarRespuestaJefe(ObjRespuestaJefe, this.idSolicitud).then(
      (itemResult)=>{
        resp = {
          resp: true
        }        
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al aprobar la solicitud");  
        resp = {
          resp: false
        }        
      }
    );

    return resp;
  }
  
  async RechazarSolicitud(){
    this.spinnerService.show();
    let fecha = new Date();
    let hora = fecha.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    let ObjRespuestaJefe = {
      HoraAprobacionLider: hora,
      FechaAprobacionLider: fecha,
      AprobacionLider: false,
      Estado: "Rechazado",
      ResponsableActualId: null
    }

    this.MensajeAccion = "La solicitud ha sido rechazada con éxito";

    let respu = await this.GuardarRespuestaJefe(ObjRespuestaJefe);

    if (!respu.resp) {
      this.spinnerService.hide();
      return false;
    }

    let objServicio = {          
      ResponsableActualId: null,
      Estado: "Rechazado"
    }

    let respServ = await this.guardarServicio(objServicio);
    
    this.enviarNotificacion("Rechazada");
  }

  async RecibirSolicitud(){
    this.spinnerService.show()
    let fecha = new Date();
    let hora = fecha.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    let observacionGH = this.SolicitudPermisoForm.controls["ObservacionGH"].value;
    let ObjRespuestaGH = {
      HoraRecepcionGH: hora,
      FechaRecepcionGH: fecha,
      Estado: "Recibido por GH",
      ResponsableActualId: null,
      ObservacionGH: observacionGH
    }
    this.MensajeAccion = "La solicitud ha sido recibida con éxito";

    let respuesta = await this.guardarRecepcionGH(ObjRespuestaGH);

    if (!respuesta.resp) {
      this.spinnerService.hide();
      return false;
    }

    let objServicio = {          
      ResponsableActualId: null,
      Estado: "Recibido por GH"
    }
    
    let respServ = await this.guardarServicio(objServicio); 
    
    this.MostrarExitoso(this.MensajeAccion);
    sessionStorage.removeItem("TipoConsulta");
    setTimeout(
      ()=>{
        window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet/';
        this.spinnerService.hide();
      },2000); 
    
  }

  async guardarRecepcionGH(ObjRespuestaGH): Promise<any>{
    let respuesta;
    await this.servicio.GuardarRecepcionGH(ObjRespuestaGH, this.idSolicitud).then(
      (itemResult)=>{
        respuesta = {
          resp: true
        }
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al aprobar la solicitud");  
        respuesta = {
          resp: false
        }      
      }
    );

    return respuesta;
  }

  enviarNotificacion(accion): any {
    let correos = "";
          let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Se le informa que la solicitud de permiso ha sido '+accion+'</p>';
          correos = this.objUsuariosGH[0].email;
          const emailProps: EmailProperties = {
            To: [correos],
            CC: [this.EmailSolicitante],
            Subject: "Notificación de solicitud de permiso",
            Body: TextoCorreo,
          };
          this.servicio.EnviarNotificacion(emailProps).then(
            (res)=>{
              this.MostrarExitoso(this.MensajeAccion);
              sessionStorage.removeItem("TipoConsulta");
              setTimeout(
                ()=>{
                  window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet/';
                  this.spinnerService.hide();
                },2000);          
            }
          ).catch(
            (error)=>{
              this.mostrarError("Error al enviar la notificacion");
              setTimeout(
                ()=>{
                  window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet/';
                  this.spinnerService.hide();
                },2000);
              
            }
          ) 
  }

  async guardarServicio(objServicio): Promise<any> {
    let respuesta;
    await this.servicio.ModificarServicio(objServicio, this.IdServicio).then(
        (resultado)=>{
          respuesta = {
            resp: true
          }          
        }
    ).catch(
      (error)=>{
        console.log(error); 
        respuesta = {
          resp: false
        }               
      }
    );

    return respuesta;
  }  

  formatearFecha(fecha) {
    let fecha1 = fecha.split('T');
    let fecha2 = fecha1[0].split('-');
    return `${fecha2[2]}/${fecha2[1]}/${fecha2[0]}`
  }

  generarPdf() {
    let fechaInicio = this.formatearFecha(this.SolicitudPermisoForm.controls["FechaInicio"].value);
    let fechaFin = this.formatearFecha(this.SolicitudPermisoForm.controls["FechaFin"].value);
    let horaInicio = this.SolicitudPermisoForm.controls["HoraInicio"].value;
    let horaFin = this.SolicitudPermisoForm.controls["HoraFin"].value;
    let horaFechaInicio = `${fechaInicio} - ${horaInicio}`;
    let horaFechaFin = `${fechaFin} - ${horaFin}`;
    const documentDefinition = {
      watermark: { text: 'APROBADO', color: 'blue', opacity: 0.1, italics: false },
      content: [
        {text: 'Solicitud de permisos', style: 'header'},
        {
          style: 'marginTable',
          table: {
            widths: [135, 135, 90],
            heights: [20, 20],
            body: [
              [{text: 'Apellidos', bold: true,alignment: 'center', fillColor: '#eeeeee', border: [true, true, false, true]}, {text: 'Nombres', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [false, true, false, true]}, {text: 'Cédula', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [false, true, true, true]}],
              [{text: this.SolicitudPermisoForm.controls["Apellidos"].value, alignment: 'center', border: [true, false, false, true]}, {text: this.SolicitudPermisoForm.controls["Nombres"].value, alignment: 'center', border: [false, true, false, true]}, {text: this.SolicitudPermisoForm.controls["Cedula"].value, alignment: 'center', border: [false, false, true, true]}]
            ]
          }
        },
        {
          style: 'marginTable',
          table: {
            widths: [135, 135, 90],
            heights: [20, 20],
            body: [
              [{text: 'Cargo-Rol', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [true, true, false, true]}, {text: 'Unidad de negocio', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [false, true, false, true]}, {text: 'Teléfono', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [false, true, true, true]}],
              [{text: this.SolicitudPermisoForm.controls["CargoRol"].value, alignment: 'center', border: [true, false, false, true]}, {text: this.SolicitudPermisoForm.controls["UnidadNegocio"].value, alignment: 'center', border: [false, false, false, true]}, {text: this.SolicitudPermisoForm.controls["TelefonoExt"].value, alignment: 'center', border: [false, false, true, true]}]
            ]
          }
        },
        {text: 'Descripción', style: 'header2'},
        {
          style: 'marginTable2',
          table: {
            widths: [184, 184],
            heights: [20, 20],
            body: [
              [{text: 'Tipo de permiso', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [true, true, false, true]}, {text: 'Motivo del permiso', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [false, true, true, true]}],
              [{text: this.SolicitudPermisoForm.controls["TipoPermiso"].value, alignment: 'center', border: [true, false, false, true]}, {text: this.SolicitudPermisoForm.controls["MotivoPermiso"].value, alignment: 'center', border: [false, false, true, true]}]
            ]
          }
        },
        {
          style: 'marginTable3',
          table: {
            widths: [376],
            heights: [20, 20],
            body: [
              [{text: 'Otro ¿Cuál?', bold: true, alignment: 'center', fillColor: '#eeeeee'}],
              [{text: this.SolicitudPermisoForm.controls["OtroMotivo"].value, alignment: 'center'}]
            ]
          }
        },
        {text: 'Duración del permiso', style: 'header2'},
        {
          style: 'marginTable2',
          table: {
            widths: [184, 184],
            heights: [20, 20],
            body: [
              [{text: 'Fecha y hora de inicio', bold: true, alignment: 'center', fillColor: '#eeeeee', border: [true, true, false, true]}, {text: 'Fecha y hora de finalización', bold: true, alignment: 'center',  fillColor: '#eeeeee', border: [false, true, true, true]}],
              [{text: horaFechaInicio, alignment: 'center', border: [true, false, false, true]}, {text: horaFechaFin, alignment: 'center', border: [false, false, true, true]}]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 90, 0, 30]
        },
        marginTable: {
          margin: [70, 0, 0, 20],
        },
        header2: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 5, 0, 15]
        },
        marginTable2: {
          margin: [70, 15, 0, 10]
        },
        marginTable3: {
          margin: [70, 0, 0, 20]
        }
      }
    }
    pdfMake.createPdf(documentDefinition).open();
  }

}
