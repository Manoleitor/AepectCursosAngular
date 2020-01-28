import { Asistente } from "./asistente";

export class Curso{

    public id: number;
    public nombre: string;
    public anio: string;
    public maximos_participantes?: number;
    public fecha_creacion: Date;
    public asistentes?: Array<Asistente>;
  
}