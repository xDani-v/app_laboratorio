import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Procedimiento } from '../../models/procedimiento.model';

@Component({
  selector: 'app-hormonal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hormonal.component.html',
  styleUrl: './hormonal.component.css'
})
export class HormonalComponent {

  prolactina = new Procedimiento('Prolactina', 0, 'ng/mL', 0, 25, "");
  Estradiol = new Procedimiento('17-Beta- Estradiol', 0, 'pg/mL', 0, 0, "");
  Tipo: string = "";


  updatereferenciaValues() {
    if (this.Tipo === 'Hombres') {
      this.Estradiol.referencia.min = 15;
      this.Estradiol.referencia.max = 55;
    }
    if (this.Tipo === 'Fase Folicular') {
      this.Estradiol.referencia.min = 30;
      this.Estradiol.referencia.max = 150;
    }
    if (this.Tipo === 'Pre-Ovulación') {
      this.Estradiol.referencia.min = 150;
      this.Estradiol.referencia.max = 500;
    }
    if (this.Tipo === 'Fase Lútea') {
      this.Estradiol.referencia.min = 30;
      this.Estradiol.referencia.max = 250;
    }
    if (this.Tipo === 'Post- Menopausia') {
      this.Estradiol.referencia.min = 0;
      this.Estradiol.referencia.max = 60;
    }
  }

  getFormData() {
    const procedimientosData = [this.prolactina, this.Estradiol]
      .map(procedimiento => ({
        propiedad: procedimiento.propiedad,
        resultado: procedimiento.resultado,
        unidad: procedimiento.unidad,
        estado: procedimiento.estado,
        referencia: procedimiento.referencia
      }));

    return {
      procedimientos: procedimientosData
    };
  }

}
