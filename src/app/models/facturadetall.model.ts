import { Vehicle } from './vehicle.model';
import { Persona } from './persona.model';

export class FacturaDetall {

    constructor (
        public vehicle: string,
        public temporada: string,
        public data_inicial: string,
        public data_final: string,
        public dies: number,
        public id_factura: string,
        public observacions?: string,
        public preu?: number,
        public _id?: string
    ) { }
}
