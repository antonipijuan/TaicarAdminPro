export class Despesa {

    constructor (
        public vehicle: string,
        public preu: number,
        public data: Date,
        public tipus: string,
        public observacions: string,
        public _id?: string
    ) { }
}
