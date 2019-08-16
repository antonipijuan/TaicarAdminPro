export class Pagament {

    constructor (
        public client: string,
        public factura: string,
        public import_pagat: Number,
        public data_pagament: String,
        public observacions?: string,
        public _id?: string
    ) { }
}
