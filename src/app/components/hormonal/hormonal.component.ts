import { Component } from '@angular/core';
import { HormonalModel } from '../../models/HormonalMode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hormonal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hormonal.component.html',
  styleUrl: './hormonal.component.css'
})
export class HormonalComponent {

  prolactina: HormonalModel = new HormonalModel('Prolactina', 0, 'ng/mL', 0, 25, "");
  Estradiol: HormonalModel = new HormonalModel('17-Beta- Estradiol', 0, 'pg/mL', 0, 0, "");
  Tipo: string = "";


  updateReferenceValues() {
    if (this.Tipo === 'Hombres') {
      this.Estradiol.reference.min = 15;
      this.Estradiol.reference.max = 55;
    }
    if (this.Tipo === 'Fase Folicular') {
      this.Estradiol.reference.min = 30;
      this.Estradiol.reference.max = 150;
    }
    if (this.Tipo === 'Pre-Ovulación') {
      this.Estradiol.reference.min = 150;
      this.Estradiol.reference.max = 500;
    }
    if (this.Tipo === 'Fase Lútea') {
      this.Estradiol.reference.min = 30;
      this.Estradiol.reference.max = 250;
    }
    if (this.Tipo === 'Post- Menopausia') {
      this.Estradiol.reference.min = 0;
      this.Estradiol.reference.max = 60;
    }
  }

  getData() {
    // Update the state of each model
    this.prolactina.updateEstado();
    this.Estradiol.updateEstado();

    // Return the data
    return {
      prolactina: this.prolactina,
      Estradiol: this.Estradiol
    };
  }

}
