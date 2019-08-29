import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Usuario } from '../Entidades/usuario';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SPServicio } from '../Servicios/sp-servicio';
import { ItemAddResult, EmailProperties } from '@pnp/sp';
import SimpleCrypto from 'simple-crypto-js';

@Component({
  selector: 'app-solicitud-permiso',
  templateUrl: './solicitud-permiso.component.html',
  styleUrls: ['./solicitud-permiso.component.css']
})
export class SolicitudPermisoComponent implements OnInit {
  
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

  constructor( 
    private formBuilder: FormBuilder, 
    public toastr: ToastrManager,
    private spinnerService: Ng4LoadingSpinnerService,
    private servicio: SPServicio) { 
    this.otroTipoPermiso = false;
    this.TipoPermiso = "";
    let subDays = new Date()
    subDays.setDate(subDays.getDate() - 7)
    this.minDateFechaInicio = (new Date(subDays));
  }

  ngOnInit() {
    this.spinnerService.show(); 
    this.ObtenerUsuarioActual();
    let usuarioActual = sessionStorage.getItem("usuario");    
    this.usuarioActual = JSON.parse(usuarioActual);
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
      FechaFin: ["", Validators.required]
    });     
      
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Id);     
        this.ObtenerEmpleado();
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  }

  ObtenerEmpleado(){
    this.servicio.obtenerUsuarioListaEmpleados(this.usuarioActual.idUsuario).then(
      (res)=>{
        
        if (res.length > 0) { 
           
          if (res[0].JefeId !== null) {
            this.usuarioActual.IdJefeDirecto = res[0].JefeId;
            this.usuarioActual.NombreJefeDirecto = res[0].Jefe.Title;
            this.usuarioActual.EmailJefe = res[0].Jefe.EMail;
          }
          
          let SegundoNombre = res[0].SegundoNombre === null? "" : " "+res[0].SegundoNombre;
          let SegundoApellido = res[0].SegundoApellido === null? "" : " "+res[0].SegundoApellido;
          let nombre = res[0].PrimerNombre + SegundoNombre;
          this.usuarioActual.nombre = nombre;
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
          
          this.spinnerService.hide();
        }
        else {
          this.mostrarError("El usuario no fue encontrado");
          setTimeout(() => {
            window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
          }, 2000);
          
        }
        
      }
    ).catch(
      (error)=>{
          console.log(error);
      }
    );
  }

  TipoPermisoSelect(elemento) {
    this.TipoPermiso = elemento.value;
      if (this.TipoPermiso === "Otro") {
          this.otroTipoPermiso = true;
          this.SolicitudPermisoForm.controls["OtroMotivo"].setValidators([Validators.required]);
          this.SolicitudPermisoForm.controls['OtroMotivo'].updateValueAndValidity();
      }
      else {
        this.otroTipoPermiso = false;
        this.SolicitudPermisoForm.controls["OtroMotivo"].setValidators([]);
          this.SolicitudPermisoForm.controls['OtroMotivo'].updateValueAndValidity();
      }
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

  setFechaFin(event){
    this.minDateFechaFin = event.value;
  }

  private AsignarFormatoFecha(FechaActividad: Date) {
    let diaActividadExtraordinaria = FechaActividad.getDate();
    let mesActividadExtraordinaria = FechaActividad.getMonth();
    let anoActividadExtraordinaria = FechaActividad.getFullYear();
    let hoy = new Date();
    let horas = FechaActividad.getHours() === 0 ? hoy.getHours() : FechaActividad.getHours();
    let minutos = FechaActividad.getMinutes() === 0 ? 1 : FechaActividad.getMinutes();
    let segundos = FechaActividad.getSeconds() === 0 ? 1 : FechaActividad.getSeconds();
    let fechaRetornar = new Date(anoActividadExtraordinaria, mesActividadExtraordinaria, diaActividadExtraordinaria, horas, minutos, segundos).toISOString();
    return fechaRetornar;
  }

  onSubmit(){
    this.spinnerService.show();

    if (this.TipoPermiso === "") {
      this.spinnerService.hide(); 
      this.mostrarAdvertencia("Por favor indique el tipo de permiso");   
      return false;
    }

    if (this.SolicitudPermisoForm.invalid) {  
      this.spinnerService.hide(); 
      this.mostrarAdvertencia("Faltan campos por diligenciar");   
      return false;
    }    

    let TipoPermiso = this.TipoPermiso;
    let OtroPermiso = this.SolicitudPermisoForm.controls["OtroMotivo"].value;
    let MotivoPermiso = this.SolicitudPermisoForm.controls["MotivoPermiso"].value;
    let HoraInicio = this.SolicitudPermisoForm.controls["HoraInicio"].value;
    let FechaInicio = this.SolicitudPermisoForm.controls["FechaInicio"].value;
    FechaInicio = this.AsignarFormatoFecha(FechaInicio);
    let HoraFin = this.SolicitudPermisoForm.controls["HoraFin"].value;
    let FechaFin = this.SolicitudPermisoForm.controls["FechaFin"].value;
    FechaFin = this.AsignarFormatoFecha(FechaFin);
    let ObjSolicitudPermisos = {
        SolicitanteId: this.usuarioActual.idUsuario,
        TipoPermiso: TipoPermiso,
        OtroTipoPermiso: OtroPermiso,
        MotivoPermiso: MotivoPermiso,
        FechaInicioPermiso: FechaInicio,
        FechaFinPermiso: FechaFin,
        HoraInicioPermiso: HoraInicio,
        HoraFinPermiso: HoraFin,
        FechaSolicitud: new Date(),
        Estado: "En revision jefe",
        ResponsableActualId: {
          results: [this.usuarioActual.IdJefeDirecto]
        }
    }

    this.servicio.GuardarSolicitud(ObjSolicitudPermisos).then(
      (resultado: ItemAddResult)=>{
          
          let idSolicitud = resultado.data.Id; 
          
          let objServicio = {
            TipoServicio: "Solicitud de permisos",
            CodigoServicioId: 1,
            AutorId: this.usuarioActual.idUsuario,
            ResponsableActualId: this.usuarioActual.IdJefeDirecto,
            Estado: "En revision jefe",
            idServicio: idSolicitud
          }   
          this.guardarServicio(objServicio);       
      }
    ).catch(
      (error)=>{
          console.error(error);
          this.mostrarError("Error al enviar la solicitud");
          this.spinnerService.hide(); 
      }
    )
    
  }

  guardarServicio(objServicio){
      this.servicio.GuardarServicio(objServicio).then(
        (resultado: ItemAddResult)=>{
          
          let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>El usuario <strong>'+this.usuarioActual.nombre+'</strong> le ha enviado una solicitud de permisos</p>' +
                            '<br>'+
                            '<p>Por favor revisar la bandeja de pendientes en el<a href="https://aribasas.sharepoint.com/sites/Intranet"> home de la intranet</a></p>';

          const emailProps: EmailProperties = {
            To: [this.usuarioActual.EmailJefe ],
            Subject: "Notificación de solicitud de permiso",
            Body: TextoCorreo,
          };
          this.servicio.EnviarNotificacion(emailProps).then(
            (res)=>{
                  this.MostrarExitoso("Solicitud enviada con éxito");
                  setTimeout(
                    ()=>{
                      window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                      this.spinnerService.hide();
                    },2000);
            }
          ).catch(
            (error)=>{
              this.mostrarError("Error al enviar la notificacion");
              setTimeout(
                ()=>{
                  window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                  this.spinnerService.hide();
                },2000);
              
            }
          )         
          
        }
      ).catch(
        (error)=>{
          console.error(error);
          this.mostrarError("Error al enviar la solicitud");
          setTimeout(
            ()=>{
              window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
              this.spinnerService.hide();
            },2000); 
        }
      )       
  }



}
