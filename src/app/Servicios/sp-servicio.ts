import { environment } from 'src/environments/environment';
import { sp } from '@pnp/sp';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { promised } from 'q';

@Injectable()
export class SPServicio {
    constructor() { }

    public ObtenerConfiguracion() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWeb);

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

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyIsImtpZCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU3MjAxNTk4MCwibmJmIjoxNTcyMDE1OTgwLCJleHAiOjE1NzIwNDUwODAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.RJz0mJn5T8wD_MFVM41zUB9mhJAgiyiqvP4GeooP6QP-_ahL3pQl8PWamnCmBMrfMRSgOccyGhCKMeUJkue1cBKLIauWF9pRmOA-l3Prz5W4AhZsFsOjBzSbYAIdkiDuKQmQRcSiXxB3I7R-n_cmXtuQDDMVEwe0NIhMIMJq0o9jrG1MOCw4aNgadu1tOeODRH8K8KqhL5dvvOmt2Qcny0slhSKX7ti3pZ1dyEU7gVaG94-i6fD33jf1dq6BvJzGgFmzsIwwg0r4smHPwBlsb0gWJUANNFnGlb8DvS7DO7BVnrkPgrucs7YWJs9W6IfT_QUcIQNjRu3MaCT9xY07SA'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyIsImtpZCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU3MjAxNTkzMywibmJmIjoxNTcyMDE1OTMzLCJleHAiOjE1NzIwNDUwMzMsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiZmFlYWNkNGUtN2E4OS00ZjU5LWFmYjAtNmNjNzJiYTA1YTJkQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInN1YiI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.OYXPHP7ac4aAb1tHkzTcYn5GoR-9_2ykmf9gc6l64n9ynzvjPftkRBcPRn9Vs9fiz6ELh_UBU_Gj_xk_u3J5Xv40baZHCh5nKclhYNPLimsgEvYLYFzRqhSSQS8AaFWEaRabQGv_rZWdbjUrtS2u4k6B5kOvwXMznSgVzG8Otk3pIKdiWp09TvG5qI_rY1IaxZ7R5q89eynzHhy8Tv-Jpep4mQvLX0MquMU1LLsym5fmuDJhc72GlSzftY1INCx4-IGmeZ_oswXPHPOqfQugOqFO99sZ0WxKUW21mIyDL4FUHoye0icOgw7NXLmYpca_JvBG1VlukeG5u7rIkh9kSw'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracion().web.currentUser.get());
        return respuesta;
    }

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.select('*', 'User/Department').expand('User').get());
        return respuesta;
    } 
    
    obtenerUsuarioListaEmpleados(UsuarioActualId) {
        let respuesta = this.ObtenerConfiguracionGH().web.lists.getByTitle(environment.ListaEmpleados).items.filter("usuario eq "+UsuarioActualId).select("*","Jefe/Title","Jefe/EMail").expand("Jefe").getAll();
        return respuesta;
    }

    GuardarSolicitud(ObjSolicitud){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.add(ObjSolicitud);
        return respuesta;
    }

    GuardarServicio(ObjServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    consultarSolicitudPermiso(idSolicitud){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.filter("Id eq "+idSolicitud).select("*","Solicitante/Title","Solicitante/EMail").expand("Solicitante").getAll();
        return respuesta;
    }

    GuardarRespuestaJefe(ObjSolicitud, IdSolicitud){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
        return respuesta;
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Solicitud de permisos'").getAll();
        return respuesta;
    }

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    GuardarRecepcionGH(ObjSolicitud, IdSolicitud) {
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
        return respuesta;
    }

    ValidarUsuarioGH(idUsuarioGH){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaUsuariosAprobadores).items.filter("GestionHumanaId eq '"+idUsuarioGH+"'").getAll();
        return respuesta;
    }
    
    ObtenerUsuarioGH(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaUsuariosAprobadores).items.select("*,GestionHumana/EMail").expand("GestionHumana").getAll();
        return respuesta;
    }
    
    obtenerSolicitudesGH(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.filter("Estado eq 'En revision GH'").select("*","Solicitante/Title").expand("Solicitante").getAll();
        return respuesta;
    }

    EnviarNotificacion(objNotificacion){
        let respuesta = this.ObtenerConfiguracionConPost().utility.sendEmail(objNotificacion);
        return respuesta;
    }

    // async AgregarHojaDeVida(nombre, archivo: File, objItems): Promise<any>{
    //     let mensaje = ""
        
    //     let respuesta = await this.ObtenerConfiguracionConPost().web.getFolderByServerRelativeUrl("Prueba/Esteban").files.add(nombre, archivo).then(
    //         f=>{
                
    //             f.file.getItem().then(item => {
                    
    //                 item.update(objItems);
    //                 mensaje= "Exitoso";
    //                 return mensaje
    //             })
    //         }
    //     ).catch(
    //         (error)=>{
    //             debugger
    //             mensaje= "Error";
    //             return mensaje
    //         }
    //     )
        
    // }

   
       

}