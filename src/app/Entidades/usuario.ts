export class Usuario{

    idUsuario: number;
    nombre: string;
    apellidos: string;
    cedula: string;
    cargo: string;  
    Area: string;  
    celular: string;
    email: string;
    IdJefeDirecto: number;
    NombreJefeDirecto: string;
    EmailJefe: string;
    Empresa: string;
    

    constructor(
        idUsuario: number, 
        nombre?: string, 
        apellidos?: string, 
        cedula?: string, 
        cargo?: string, 
        Area?: string, 
        celular?: string,
        email?: string, 
        IdJefeDirecto?: number, 
        NombreJefeDirecto?: string,
        EmailJefe?: string,
        Empresa?: string
        )
        {
            this.idUsuario = idUsuario;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.cedula = cedula;
            this.cargo = cargo;
            this.Area = Area;
            this.celular = celular;
            this.email = email;
            this.IdJefeDirecto= IdJefeDirecto;
            this.NombreJefeDirecto = NombreJefeDirecto;  
            this.EmailJefe = EmailJefe; 
            this.Empresa = Empresa     
        }

    public static fromJson(element: any) {

        // return new Usuario(element.Title, element.Email, element.Id, -1, "", "");
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}