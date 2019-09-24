export class Solicitud{

    constructor(
        public idUsuario: number,         
        public tipoPermiso?: string,
        public otroTipoPermiso?: string,
        public motivoPermiso?: string,
        public horaInicioPermiso?: string,
        public horaFinPermiso?: string,
        public fechaInicioPermiso?: string,
        public fechaFinPermiso?: string,
        public estado?: string,
        public responsableActual?: any,
        public EmailSolicitante?: string,
        public ObservacionGH?: string)
        {
                   
        }

    public static fromJson(element: any) {
        
        return new Solicitud(
            element.SolicitanteId, 
            element.TipoPermiso, 
            element.OtroTipoPermiso, 
            element.MotivoPermiso, 
            element.HoraInicioPermiso,
            element.HoraFinPermiso,
            element.FechaInicioPermiso,
            element.FechaFinPermiso,
            element.Estado,
            element.ResponsableActualId,
            element.Solicitante.EMail,
            element.ObservacionGH);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}