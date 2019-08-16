import { Vehicle } from './vehicle.model';
import { Persona } from './persona.model';
import { PressupostDetall } from './pressupostdetall';
import { FacturaDetall } from './facturadetall.model';

export class Factura {

    constructor (
        public num: number,
        public data: String,
        public data_vigencia: String,
        public client: Persona,
        public detall: FacturaDetall[],
        public preu_brut: number,
        public preu_net: number,
        public estat: string,
        public observacions?: string,
        public pendent_pagament?: number,
        public pendent_pagat?: number,
        public _id?: string
    ) { }
}
