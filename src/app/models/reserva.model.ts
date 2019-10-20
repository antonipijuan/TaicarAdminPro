import { Vehicle } from './vehicle.model';

export class Reserva {

    constructor (
        public pressupost: string,
        public vehicle: string,
        public data_inicial: string,
        public data_final: string,
        public estat?: string,
        public _id?: string
    ) { }
}
