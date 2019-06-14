import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudPermisoComponent } from './solicitud-permiso/solicitud-permiso.component';
import { ValidarSolicitudComponent } from './validar-solicitud/validar-solicitud.component';
import { SolicitudesPendientesComponent } from './solicitudes-pendientes/solicitudes-pendientes.component';

const routes: Routes = [
  { path: '', component: SolicitudPermisoComponent },
  { path: 'crearsolicitud', component: SolicitudPermisoComponent },
  { path: 'solicitudPermiso', component: ValidarSolicitudComponent},
  { path: 'solicitudes-pendientes', component: SolicitudesPendientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
