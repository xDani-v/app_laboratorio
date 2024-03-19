export class Procedimiento {

    propiedad: string;
    resultado: number;
    unidad: string;
    estado: string;
    referencia: { min: number, max: number };
    observaciones?: string;



    constructor(propiedad: string, resultado: number, unidad: string, min: number, max: number, estado: string, observaciones?: string) {
        this.propiedad = propiedad;
        this.resultado = resultado;
        this.unidad = unidad;
        this.estado = estado;
        this.referencia = { min, max };
        this.observaciones = observaciones;
    }

    calcularEstado() {
        if (this.resultado < this.referencia.min) {
            this.estado = "↓";
        } else if (this.resultado > this.referencia.max) {
            this.estado = "↑";
        } else {
            this.estado = "";
        }
    }


}