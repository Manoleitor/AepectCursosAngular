import { asistente } from "./asistente";

export class Curso{

    constructor(id:number)
    {
        this.id = id;
    }
    public id?: number;
    public nombre: string;
    public anio: string;
    public maximos_participantes?: number;
    public fecha_creacion?: Date;
    public asistentes?: Array<asistente>;
    public movil?:boolean;
    public transporte?:boolean;
    public habitacion?:boolean;
    public cena?:boolean;
  
}