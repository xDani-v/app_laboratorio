import { Component } from '@angular/core';
import { Procedimiento } from '../../models/procedimiento.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tumoral',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tumoral.component.html',
  styleUrl: './tumoral.component.css'
})
export class TumoralComponent {

  procedimientos: Procedimiento[] = [
    new Procedimiento('AG. CARCINOEMBRIONARIO CEA', 0, 'ng/ml.', 0, 4.6, ''),
    new Procedimiento('CA 72-4', 0, 'U/ml.', 0.5, 6.9, ''),
    new Procedimiento('CA 19-9', 0, 'U/ml.', 0, 30, ''),
    new Procedimiento('Alfafetoproteina', 0, 'IU/ml.', 0, 10.0, ''),
    new Procedimiento('HCG Cuantificada', 0, 'mIU/ml.', 0, 0, '', 'Hombres y mujeres no embarazadas: Hasta 3 mIU/ml.\nDudoso para Embarazo: Hasta 25 mIU/ml.\nSemanas de Embarazo:\n1 - 2 Semanas: 30 - 150 mIU/ml.\n2 - 3 Semanas: 100 - 4,800 mIU/ml.\n3 - 4 Semanas: 1,000 - 32,000 mIU/ml.\n4 - 5 Semanas: 2,500 - 82,000 mIU/ml.\n5 - 6 Semanas: 23,000 - 151,000 mIU/ml.\n6 - 7 Semanas: 27,000 - 233,000 mIU/ml.\n7 - 11 Semanas: 20,000 - 291,000 mIU/ml.\n11 - 16 Semanas: 6,100 - 103,000 mIU/ml.\n16 - 21 Semanas: 4,700 - 85,000 mIU/ml.\n21 - 40 Semanas: 2,700 - 81,000 mIU/ml.'),
    new Procedimiento('PSA Total', 0, 'ng/ml.', 0, 4.00, ''),
    new Procedimiento('PSA Libre', 0, 'ng/ml', 0, 1.3, ''),
    new Procedimiento('PSA Libre %', 0, '', 0, 0, '', 'Interpretación:\nMenor de 15 %: Probable Cáncer\n15 - 25 %: No definido (Observar)\nMayor de 25% Probable Proceso Benigno')
  ];

  showInput: any = {};

  toggleInput(index: number, event: any) {
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
    return ({
      procedimientos: procedimientosData,
    });
  }
}
