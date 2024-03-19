export class HormonalModel {
    name: string;
    result: number;
    unit: string;
    reference: { min: number, max: number };
    estado: string;

    constructor(name: string, result: number, unit: string, min: number, max: number, estado: string) {
        this.name = name;
        this.result = result;
        this.unit = unit;
        this.reference = { min, max };
        this.estado = estado;
    }

    updateEstado() {
        if (this.result < this.reference.min) {
            this.estado = '↓';
        } else if (this.result > this.reference.max) {
            this.estado = '↑';
        } else {
            this.estado = '';
        }
    }
}
