import { environment } from 'src/environments/environment';
import { sp } from '@pnp/sp';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { promised } from 'q';

@Injectable()
export class SPServicio {
    constructor() { }

    public ObtenerConfiguracionServicio() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWebServicio);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWebGH);

        return configuracionSharepoint;
    } 

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracionServicio().web.currentUser.get());
        return respuesta;
    }

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracionServicio().web.siteUsers.select('*', 'User/Department').expand('User').get());
        return respuesta;
    } 
    
    obtenerUsuarioListaEmpleados(UsuarioActualId) {
        let respuesta = this.ObtenerConfiguracionGH().web.lists.getByTitle(environment.ListaEmpleados).items.filter("usuario eq "+UsuarioActualId).select("*","Jefe/Title","Jefe/EMail").expand("Jefe").getAll();
        return respuesta;
    }

    async GuardarSolicitud(ObjSolicitud): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.add(ObjSolicitud);
        return respuesta;
    }

    async GuardarServicio(ObjServicio): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    consultarSolicitudPermiso(idSolicitud){
        let respuesta = this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.filter("Id eq "+idSolicitud).select("*","Solicitante/Title","Solicitante/EMail").expand("Solicitante").getAll();
        return respuesta;
    }

    async GuardarRespuestaJefe(ObjSolicitud, IdSolicitud): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
        return respuesta;
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Solicitud de permisos'").getAll();
        return respuesta;
    }

    async ModificarServicio(ObjServicio, idServicio): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    async GuardarRecepcionGH(ObjSolicitud, IdSolicitud): Promise<any> {
        let respuesta = await this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
        return respuesta;
    }

    ValidarUsuarioGH(idUsuarioGH){
        let respuesta = this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaUsuariosAprobadores).items.filter("GestionHumanaId eq '"+idUsuarioGH+"'").getAll();
        return respuesta;
    }
    
    ObtenerUsuarioGH(){
        let respuesta = this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaUsuariosAprobadores).items.select("*,GestionHumana/EMail").expand("GestionHumana").getAll();
        return respuesta;
    }
    
    obtenerSolicitudesGH(){
        let respuesta = this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.filter("Estado eq 'En revision GH'").select("*","Solicitante/Title").expand("Solicitante").getAll();
        return respuesta;
    }

    EnviarNotificacion(objNotificacion){
        let respuesta = this.ObtenerConfiguracionServicio().utility.sendEmail(objNotificacion);
        return respuesta;
    }

   
       

}