import { Component, Compiler } from '@angular/core';
import { Usuario } from './Entidades/usuario';
import { SPServicio } from './Servicios/sp-servicio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: Usuario;
  nombreUsuario: string;


  constructor(private servicio: SPServicio, private compilador: Compiler) {
    this.compilador.clearCache(); 
  }

  public ngOnInit() {
    this.ObtenerUsuarioActual();
  }

// ObtenerUsuarioActual() {
//   this.servicio.ObtenerUsuarioActual().subscribe(
//     (respuesta) => {                
//       this.nombreUsuario = respuesta.Title;          
//     }, err => {
//       console.log('Error obteniendo usuario: ' + err);
//     }
//   )
// }

ObtenerUsuarioActual() {
  this.servicio.ObtenerUsuarioActual().subscribe(
    (respuesta) => {
      this.usuario = new Usuario(respuesta.Id);        
      this.nombreUsuario = respuesta.Title;
      sessionStorage.setItem('usuario', JSON.stringify(this.usuario));  
    }, err => {
      console.log('Error obteniendo usuario: ' + err);
    }
  )
}
}
