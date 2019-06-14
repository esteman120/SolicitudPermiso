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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MDQ4ODE4NywibmJmIjoxNTYwNDg4MTg3LCJleHAiOjE1NjA1MTcyODcsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.GZ23l_zFQJ008iTfH2E6IX2rwZll0cwCGQrGqidbDgVwbz4v8hcsJxK6v8ShMthAln58BPUXN_GQ73f9ejcCR3RvdaDueJpSCw6hFmHiiUlaByVRwhvDOtG8YM-xVL8vYUqbdsTesU1RS3AK52QJ5A3ZhwIlJ_OJoLng-NXiqx982nwarvCJdOgKXSvK5CP77HFc9qR_oIm9LUd3BdHqi0pmdgZsTGuocqMEpTSHZNGmygL6ip93mKCmN-mZ4HMQrLra46Eha0F4hplpUQNy2mlDAMdfm9UICrAaHTgvhLyShWVAoWbAkxm4YdaQk4pdkg6BWNKaSBlcN8FwMlYbpw'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MDQ4ODIxMCwibmJmIjoxNTYwNDg4MjEwLCJleHAiOjE1NjA1MTczMTAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiZmFlYWNkNGUtN2E4OS00ZjU5LWFmYjAtNmNjNzJiYTA1YTJkQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInN1YiI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.BYpJWQjApFNK3un1g2mS7YkPs_80H8hdQUGPqDBhuapM2KYqLLIXAOAAd6nV7VeGAr_k4JX2Vig7rw_z1BGg1pxhCWlfBLx3-xKbBIsDsOAx264tnfE799yCDKMHyQuMnKUpHaMVZCT2Q4Mh0p94KGTt-r3Dx94elgIxFVvYinmQrrkgHZUN5Sz3ZUEhf5dm0tC3wQAoQaJhCckospj1gmLQbdVaXZVPpz4XNYrb7c9KOhujVRFhD96ANMss91-KlozWO5RMVvxxtRIHZUM9L067hFc4ZS0V3_SMasIJxUzoemBlGJImBgyNzA1iU0pHOtKwC2jSm1eeFMZVfbTpXQ'
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
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.add(ObjSolicitud);
        return respuesta;
    }

    GuardarServicio(ObjServicio){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    consultarSolicitudPermiso(idSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.filter("Id eq "+idSolicitud).select("*","Solicitante/Title","Solicitante/EMail").expand("Solicitante").getAll();
        return respuesta;
    }

    GuardarRespuestaJefe(ObjSolicitud, IdSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
        return respuesta;
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud).getAll();
        return respuesta;
    }

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    GuardarRecepcionGH(ObjSolicitud, IdSolicitud) {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
        return respuesta;
    }

    ValidarUsuarioGH(idUsuarioGH){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaUsuariosAprobadores).items.filter("GestionHumanaId eq '"+idUsuarioGH+"'").getAll();
        return respuesta;
    } 
    
    obtenerSolicitudesGH(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.filter("Estado eq 'En revision GH'").select("*","Solicitante/Title").expand("Solicitante").getAll();
        return respuesta;
    }

    EnviarNotificacion(objNotificacion){
        let respuesta = this.ObtenerConfiguracion().utility.sendEmail(objNotificacion);
        return respuesta;
    }

    // async AgregarHojaDeVida(nombre, archivo: File, objItems): Promise<any>{
    //     let mensaje = ""
        
    //     let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("Prueba/Esteban").files.add(nombre, archivo).then(
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