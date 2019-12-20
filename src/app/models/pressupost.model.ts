import { Vehicle } from './vehicle.model';
import { Persona } from './persona.model';
import { PressupostDetall } from './pressupostdetall';

export class Pressupost {

    constructor (
        public num: number,
        public data: Date,
        public data_vigencia: Date,
        public client: Persona,
        public detall: PressupostDetall[],
        public preu_brut: number,
        public descompte: number,
        public preu_net: number,
        public estat: string,
        public observacions?: string,
        public _id?: string
    ) { }
}
