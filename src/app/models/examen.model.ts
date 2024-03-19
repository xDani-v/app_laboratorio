export class Examen {

    propiedad: string;
    resultado: string;
    observaciones?: string;

    constructor(propiedad: string, resultado: string, observaciones?: string) {
        this.propiedad = propiedad;
        this.resultado = resultado;
        this.observaciones = observaciones;
    }

}