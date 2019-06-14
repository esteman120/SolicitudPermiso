export class SolicitudesPendientes{

    constructor(
        public IdRegistro,
        public Solicitante,
        public IdSolicitante,        
        public TipoPermiso,
        public fechaInicio,
        public fechaSolicitud)
        {
                   
        }

    public static fromJson(element: any) {
        
        return new SolicitudesPendientes(
            element.Id, 
            element.Solicitante.Title, 
            element.SolicitanteId, 
            element.TipoPermiso, 
            element.FechaInicioPermiso,
            element.FechaSolicitud            
            );
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}