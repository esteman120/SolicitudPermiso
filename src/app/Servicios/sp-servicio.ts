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

    public ObtenerConfiguracionConPostServicio() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTgxNTIxMTQzLCJuYmYiOjE1ODE1MjExNDMsImV4cCI6MTU4MTU1MDI0MywiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.sEi1r1R1srN8GR5lx8K9LOQZ5W9MhvMFbzPSC6-qLiYL6xHArS4rSiEHshTzmi15GLojm-O4kLQk7LTbGYkoFk58C7bOMZIImh18GnuOXUxBciuLxS_9zwZE5KkJzHGWIxO5kf00y9vqhxz5u9r578vgx-o1kz5Per3HzuRgInpDPb1IKuBS6_IR8xzENP3IZadidQpuhbYflq0QGPfpH8fByYUeCWTUcoif0lfSqWVSUkwd-hUgI5D1R_KvSjjbWjTJ-5g71IIv1283s4QGP-aS9s6E7bEDukXp1TToPbjQmOGR2furQ2CnYD2_spMGAyMeIFuQCpFA0gKMRovLaQ'
            }
        }, environment.urlWebServicio);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTgxNTIwOTgwLCJuYmYiOjE1ODE1MjA5ODAsImV4cCI6MTU4MTU1MDA4MCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI0MTMxMjQ4ZC1iMDliLTQ4ZmItOWE5Ni04MTdjNTU5NzI3YTFAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0Iiwic3ViIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.BZdSOUCCGNh0gnWyqOWhJHFbCVI-J_rpkDvUv4UFXkGa3caTjYJgkg2QKV0oQAfRrmwX6qaHZU9aUJfp50RWVgNL1rDORRFvTRI49G_sMBeE3RO3CNtICwo3-5IO8gqm8aLGs4CrSKYRTEwcBmEIDryflcPyMs-avvg2_2qIsX5N6Dfepp9kDWHdNY_6i4MtJwGHiD7tmSLYLFsSnpQx4O7clFz8pkvBkbJZKuBtIKu_WkdQSoCV9D4a6YWfO4CSrX8IVca48oV0bDn3rpE01NVor_qI6AUAxYKZM46sNvyemQzM9CBmBuoAG0I9GN4nxpWLkmgeKm_PAJzFrPQ6Fg'
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
        let respuesta = await this.ObtenerConfiguracionConPostServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.add(ObjSolicitud);
        return respuesta;
    }

    async GuardarServicio(ObjServicio): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionConPostServicio().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    consultarSolicitudPermiso(idSolicitud){
        let respuesta = this.ObtenerConfiguracionConPostServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.filter("Id eq "+idSolicitud).select("*","Solicitante/Title","Solicitante/EMail").expand("Solicitante").getAll();
        return respuesta;
    }

    async GuardarRespuestaJefe(ObjSolicitud, IdSolicitud): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionConPostServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
        return respuesta;
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracionServicio().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Solicitud de permisos'").getAll();
        return respuesta;
    }

    async ModificarServicio(ObjServicio, idServicio): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionConPostServicio().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    async GuardarRecepcionGH(ObjSolicitud, IdSolicitud): Promise<any> {
        let respuesta = await this.ObtenerConfiguracionConPostServicio().web.lists.getByTitle(environment.ListaSolicitudPermisos).items.getById(IdSolicitud).update(ObjSolicitud);
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
        let respuesta = this.ObtenerConfiguracionConPostServicio().utility.sendEmail(objNotificacion);
        return respuesta;
    }

   
       

}