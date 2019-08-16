import { Vehicle } from './vehicle.model';
import { Persona } from './persona.model';

export class PressupostDetall {

    constructor (
        public id_pressupost: string,
        public vehicle: string,
        public temporada: string,
        public data_inicial: string,
        public data_final: string,
        public dies: number,
        public observacions?: string,
        public preu?: number,
        public _id?: string,
        public id_factura?: string
    ) { }
}
