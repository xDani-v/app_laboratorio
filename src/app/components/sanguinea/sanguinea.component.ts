import { Component } from '@angular/core';
import { Procedimiento } from '../../models/procedimiento.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sanguinea',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sanguinea.component.html',
  styleUrl: './sanguinea.component.css'
})
export class SanguineaComponent {

  procedimientos: Procedimiento[] = [
    new Procedimiento('Glucosa', 0, 'mg/dL', 70, 100, 'Normal'),
    new Procedimiento('Colesterol', 0, 'mg%', 0, 200, 'Normal'),
    new Procedimiento('Triglicéridos', 0, 'mg%', 0, 165, 'Normal'),
    new Procedimiento('C. HDL', 0, 'mg%', 0, 55, 'Normal'),
    new Procedimiento('C. LDL', 0, 'mg%', 0, 130, 'Normal'),
    new Procedimiento('Urea', 0, 'mg%', 10, 50, 'Normal'),
    new Procedimiento('Creatinina M', 0, 'mg%', 0.5, 0.99, 'Normal'),
    new Procedimiento('Creatinina H', 0, 'mg%', 0.6, 1.1, 'Normal'),
    new Procedimiento('Ácido Úrico', 0, 'mg%', 1.5, 7.0, 'Normal'),
    new Procedimiento('Proteínas Totales', 0, 'g/dl', 6.0, 8.0, 'Normal'),
    new Procedimiento('Albuminas', 0, 'g/dl', 3.5, 5.5, 'Normal'),
    new Procedimiento('Globulinas', 0, 'g/dl', 2.0, 3.0, 'Normal'),
    new Procedimiento('Lípidos Totales', 0, 'mg%', 400, 800, 'Normal'),
    new Procedimiento('Bilirrubinas Totales', 0, 'mg/l', 0, 1, 'Normal'),
    new Procedimiento('Bilirrubinas Directa', 0, 'mg%', 0, 0.2, 'Normal'),
    new Procedimiento('Bilirrubinas Indirecta', 0, 'mg%', 0, 0.75, 'Normal'),
    new Procedimiento('Nitrógeno Ureico', 0, 'mg%', 0, 0, 'Normal'),
    new Procedimiento('Hemoglobina Glicosilada', 0, '%', 4.5, 7.0, 'Normal'),
  ];

  enzimas: Procedimiento[] = [
    new Procedimiento('TRANSAMINASA Ox H', 0, 'UI/ml', 0, 37, 'Normal'),
    new Procedimiento('TRANSAMINASA PI H', 0, 'UI/ml', 0, 42, 'Normal'),
    new Procedimiento('TRANSAMINASA Ox M', 0, 'UI/ml', 0, 31, 'Normal'),
    new Procedimiento('TRANSAMINASA PI M', 0, 'UI/ml', 0, 32, 'Normal'),
    new Procedimiento('FOSFATASA ALCALINA M', 0, 'U/L', 35, 104, 'Normal'),
    new Procedimiento('FOSFATASA ALCALINA H', 0, 'U/L', 40, 129, 'Normal'),
    new Procedimiento('FOSFATASA AC. TOTAL', 0, 'U/L', 0, 9.0, 'Normal'),
    new Procedimiento('FOSFATASA AC. PROS', 0, 'U/L', 0, 4.0, 'Normal'),
    new Procedimiento('GAMMA G.T.', 0, 'UI/L', 4.00, 61.00, 'Normal'),
    new Procedimiento('LIPASA', 0, 'U/L', 0, 60, 'Normal'),
    new Procedimiento('AMILASA', 0, 'U/L', 0, 220, 'Normal'),
    new Procedimiento('C.P.K.', 0, 'U/L', 25, 195, 'Normal'),
    new Procedimiento('C.K.Mb.', 0, 'IU/L', 80, 195, 'Normal'),
  ]
  electrolitos: Procedimiento[] = [
    new Procedimiento('SODIO', 0, 'mmol/L', 135, 155, 'Normal'),
    new Procedimiento('POTASIO', 0, 'meq/L', 3.6, 5.5, 'Normal'),
    new Procedimiento('CALCIO', 0, 'mg/dl', 8.1, 10.4, 'Normal'),
    new Procedimiento('CLORO', 0, 'mEq/L', 96, 103, 'Normal'),
    new Procedimiento('FOSFORO NIÑOS', 0, 'mg%', 3, 7, 'Normal'),
    new Procedimiento('FOSFORO ADULTOS', 0, 'mg%', 2.7, 4.5, 'Normal'),
    new Procedimiento('MAGNESIO', 0, 'mg%', 1.9, 2.5, 'Normal'),
  ]

  showInput: any = {};

  toggleInput(index: number, event: any) {
    if (this.procedimientos[index]) {
      this.showInput[this.procedimientos[index].propiedad] = event.target.checked;
    } else {
      console.error('No existe un procedimiento con el índice ' + index);
    }
  }

  toggleInputEnz(index: number, event: any) {
    if (this.enzimas[index]) {
      this.showInput[this.enzimas[index].propiedad] = event.target.checked;
    } else {
      console.error('No existe un procedimiento con el índice ' + index);
    }
  }

  toggleInputElec(index: number, event: any) {
    if (this.electrolitos[index]) {
      this.showInput[this.electrolitos[index].propiedad] = event.target.checked;
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

    const enzimasData = this.enzimas
      .filter(enzima => this.showInput[enzima.propiedad])
      .map(enzima => (
        enzima.calcularEstado(),
        {
          propiedad: enzima.propiedad,
          resultado: enzima.resultado,
          unidad: enzima.unidad,
          estado: enzima.estado,
          referencia: enzima.referencia
        }));

    const electrolitosData = this.electrolitos
      .filter(electrolito => this.showInput[electrolito.propiedad])
      .map(electrolito => (
        electrolito.calcularEstado(),
        {
          propiedad: electrolito.propiedad,
          resultado: electrolito.resultado,
          unidad: electrolito.unidad,
          estado: electrolito.estado,
          referencia: electrolito.referencia
        }));

    // return {
    //   procedimientos: procedimientosData,
    //   enzimas: enzimasData,
    //   electrolitos: electrolitosData
    // };
    console.log({
      procedimientos: procedimientosData,
      enzimas: enzimasData,
      electrolitos: electrolitosData
    });
  }
}
