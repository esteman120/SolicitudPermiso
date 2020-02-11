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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSIsImtpZCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTc5MDk3ODUzLCJuYmYiOjE1NzkwOTc4NTMsImV4cCI6MTU3OTEyNjk1MywiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.j896k6LM3ohpN3zPvOTQegIcnyKvkycKM2hUL0rddPYEK_qkPVkpt8pNExdpp9Vc5LRizwCKBTCSY3SM4Qauuj8iacBnRdelaTdTnvKjgB1ykgJ--pW6UzCwu5OtcX1s5WzcDhgCkcHcL0r9ebYdnnMAulD7Qs05uI4iDRW4cyogg_k5Uf6e3Du2VqJYCg9NAc5ODWeNPKRWPQbQUHm64cC_MO6qTjj9AK12Ii5j7BSVb2bKvXLD-jn8DDDhXEy3aFERLiazlfz1dmp6RIqbWMJQdoc1u9F0wi5thXOo4CYQcc4DYFnZVj4iEKkxix-uZdZQat-DePKyctK0jgeXNQ'
            }
        }, environment.urlWebServicio);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSIsImtpZCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTc5MDk3ODg2LCJuYmYiOjE1NzkwOTc4ODYsImV4cCI6MTU3OTEyNjk4NiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI0MTMxMjQ4ZC1iMDliLTQ4ZmItOWE5Ni04MTdjNTU5NzI3YTFAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0Iiwic3ViIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.e0HxyUUfSVbGlzZQF0sPtlHrqu6mUVeeY9XtTfgfnGLNqr7WwtU3VzIn3EERf6H_3xCuyBHN_sy5EV41JAXmFoQn4qYAa_tFD5kmb8MO0YEjj91oPXC_ila0c93Z9liD1460s2mb8shtYwxhngdbOVGmQC5YFmGzZbDlOqtrFKMp5SZiQB_ITNcdAdx1ErfwUCWksnQf2C2iChGbVSFgRzJcClZMpfIVqgx-_JUWzec2KLDodwVvbZ9rQ1pPHZP3INMe3MOWRvY0r6OScV6gWT-wvpKE1xgaGrL8e-DLYw23UR5u4miEiYdgp_ZaybzgkXaUc9BFF7MX7nPG35YFlg'
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