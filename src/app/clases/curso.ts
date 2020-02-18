import { asistente } from "./asistente";

export class Curso{

    public id?: number;
    public nombre: string;
    public anio: string;
    public maximos_participantes?: number;
    public fecha_creacion?: Date;
    public asistentes?: Array<asistente>;
    public movil?:number;
    public transporte?:number;
    public habitacion?:number;
    public cena?:number;
  
}