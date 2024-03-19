import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Procedimiento } from '../../models/procedimiento.model';


@Component({
  selector: 'app-hematologia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hematologia.component.html',
  styleUrl: './hematologia.component.css'
})
export class HematologiaComponent {
  sexo: string = '';
  procedimientos: Procedimiento[] = [];

  cargarValoresReferenciales() {
    this.procedimientos = [];
    switch (this.sexo) {
      case 'Hombre adulto':
        this.procedimientos.push(new Procedimiento('Hematocrito', 0, '%', 45.0, 52.9, 'Normal'));
        this.procedimientos.push(new Procedimiento('Hemoglobina', 0, 'g/dL', 14.0, 17.4, 'Normal'));
        this.procedimientos.push(new Procedimiento('Hematies', 0, '', 4500000, 5500000, 'Normal'));
        this.procedimientos.push(new Procedimiento('Glóbulos Blancos', 0, '', 5000, 10000, 'Normal'));
        this.procedimientos.push(new Procedimiento('Neutrófilos', 0, '%', 50.0, 75.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Linfocitos', 0, '%', 25.0, 40.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MID', 0, '%', 3.0, 7.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCV', 0, 'fL', 84.0, 96.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCH', 0, 'pg', 27.0, 32.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCHC', 0, 'g/dL', 30.0, 35.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Plaquetas', 0, '', 150000, 400000, 'Normal'));
        break;
      case 'Mujer adulta':
        this.procedimientos.push(new Procedimiento('Hematocrito', 0, '%', 36.0, 48.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Hemoglobina', 0, 'g/dL', 12.0, 16.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Hematies', 0, '', 4000000, 5100000, 'Normal'));
        this.procedimientos.push(new Procedimiento('Glóbulos Blancos', 0, '', 4500, 10000, 'Normal'));
        this.procedimientos.push(new Procedimiento('Neutrófilos', 0, '%', 35.0, 75.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Linfocitos', 0, '%', 25.0, 48.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MID', 0, '%', 3.0, 7.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCV', 0, 'fL', 76.0, 96.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCH', 0, 'pg', 27.0, 32.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCHC', 0, 'g/dL', 30.0, 35.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Plaquetas', 0, '', 150000, 400000, 'Normal'));
        break;
      case 'Preescolar':
        this.procedimientos.push(new Procedimiento('Hematocrito', 0, '%', 30.0, 40.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Hemoglobina', 0, 'g/dL', 9.5, 14.1, 'Normal'));
        this.procedimientos.push(new Procedimiento('Hematies', 0, '', 3900000, 5300000, 'Normal'));
        this.procedimientos.push(new Procedimiento('Glóbulos Blancos', 0, '', 5000, 16000, 'Normal'));
        this.procedimientos.push(new Procedimiento('Neutrófilos', 0, '%', 20.0, 45.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Linfocitos', 0, '%', 46.0, 76.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MID', 0, '%', 0.0, 5.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCV', 0, 'fL', 70.0, 84.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCH', 0, 'pg', 23.0, 29.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('MCHC', 0, 'g/dL', 31.0, 35.0, 'Normal'));
        this.procedimientos.push(new Procedimiento('Plaquetas', 0, '', 150000, 450000, 'Normal'));
        break;
    }
  }

  showInput: any = {};

  toggleInput(index: number, event: any) {
    if (!this.sexo) {
      alert('Por favor, selecciona un sexo primero.');
      return;
    }

    if (this.procedimientos[index]) {
      this.showInput[this.procedimientos[index].propiedad] = event.target.checked;
    } else {
      console.error('No existe un procedimiento con el índice ' + index);
    }
  }

  getFormData() {
    const procedimientosData = this.procedimientos
      .filter(procedimiento => this.showInput[procedimiento.propiedad])
      .map(procedimiento => (
        procedimiento.calcularEstado(),
        {
          propiedad: procedimiento.propiedad,
          resultado: procedimiento.resultado,
          unidad: procedimiento.unidad,
          estado: procedimiento.estado,
          referencia: procedimiento.referencia
        }));
    console.log({
      procedimientos: procedimientosData,
    });
  }

  submit() {

  }
}
