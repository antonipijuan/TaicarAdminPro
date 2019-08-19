import { Observable } from 'rxjs/Observable';

export class Persona {

    constructor(
        public nombre: string,
        public dni: string,
        public poblacio: string,
        public direccio: string,
        public data_naixement: string,
        public email: string,
        public telefon?: string,
        public observacions?: string,
        public codiclient?: string,
        public _id?: string
    ) { }
}
