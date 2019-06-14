import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SPServicio } from '../Servicios/sp-servicio';
import { Usuario } from '../Entidades/usuario';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SolicitudesPendientes } from '../Entidades/SolicitudesPendientes';
import { ActivatedRoute, Router } from '@angular/router';
import SimpleCrypto from "simple-crypto-js";
import { FileAddResult } from '@pnp/sp';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.css']
})

export class SolicitudesPendientesComponent implements OnInit {
  usuarioActual: Usuario;
  empty: boolean;
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ObjSolicitudes: SolicitudesPendientes[];
  adjuntoDiplomas: any;

  constructor(private servicio: SPServicio,public toastr: ToastrManager,     
    private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute,private router: Router) { 

  }

  displayedColumns: string[] = ['Solicitante','tipoPermiso','fechaSolicitud','fechaInicio','acciones'];

  ngOnInit() {
    this.spinnerService.show();
    let usuarioActual = sessionStorage.getItem("usuario");    
    this.usuarioActual = JSON.parse(usuarioActual);

    this.servicio.ValidarUsuarioGH(this.usuarioActual.idUsuario).then(
      (res)=>{
        if (res.length > 0) {
          this.obtenerSolicitudesGH();
        }
        else{
          this.empty = true;
          this.mostrarError("No tiene autorización para ingresar a esta página");
          this.spinnerService.hide();
        }
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al cargar las solicitudes");
        this.spinnerService.hide();
      }
    ) 
  }

  obtenerSolicitudesGH(): any {
    
    this.servicio.obtenerSolicitudesGH().then(
      (res)=>{
        if (res.length > 0) {
          this.empty = false;
          this.ObjSolicitudes = SolicitudesPendientes.fromJsonList(res);
          this.dataSource = new MatTableDataSource(this.ObjSolicitudes);
          this.dataSource.paginator = this.paginator;
        }
        else {
          this.empty = true;
        }
        
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al cargar las solicitudes");
        this.spinnerService.hide();
      }
    )
  }

  AbrirSolicitud(idRegistro){
    
    let idSolicitud = "U2FsdGVkX182"+idRegistro;    
    this.router.navigateByUrl('/solicitudPermiso?id='+ idSolicitud);
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

  // adjuntarDiplomas(event) {
  //   let AdjuntoDiplomas = event.target.files[0];
  //   console.log(AdjuntoDiplomas);
  //   if (AdjuntoDiplomas != null) {
  //     this.adjuntoDiplomas = AdjuntoDiplomas;
  //     this.pruebaArchivo();
  //   } else {
  //     this.adjuntoDiplomas = null;
  //   };
  // };

  // async pruebaArchivo(){
   
  //   let obj = {
  //       TipoDocumento: "Hoja de vida"
  //   }
  //   let Respuesta = await this.servicio.AgregarHojaDeVida("Archivo4", this.adjuntoDiplomas, obj).then(
  //     (respuesta)=>{
  //         let ppp = respuesta;
  //     }
  //   );    
  // }

}
