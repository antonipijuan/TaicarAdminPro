export class Vehicle {

    constructor (
        public nom: string,
        public marca: string,
        public model: string,
        public data_adquisicio: string,
        public matricula: string,
        public places: number,
        public classificacio: string,
        public color: string,
        public observacions?: string,
        public img?: string,
        public temporada_extra?: number,
        public temporada_alta?: number,
        public temporada_mitja?: number,
        public temporada_baixa?: number,
        public _id?: string
    ) { }
}
