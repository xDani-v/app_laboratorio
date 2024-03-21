import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Examen } from '../../models/examen.model';
import { Procedimiento } from '../../models/procedimiento.model';

@Component({
  selector: 'app-inmunologia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inmunologia.component.html',
  styleUrl: './inmunologia.component.css'
})
export class InmunologiaComponent {
  inmunologia_check: boolean = false;
  electrolitos_check: boolean = false;
  reaccionWidal_check: boolean = false;
  hemostasia_check: boolean = false;
  invitro_check: boolean = false;

  tuberculosisSerica = new Examen("Tuberculosis Serica", "");

  electrolitos: Procedimiento[] = [
    new Procedimiento("Sodio", 0, "mmol/L", 135, 155, "-"),
    new Procedimiento("Potasio", 0, "meq/L", 3.6, 5.5, "-"),
    new Procedimiento("Calcio", 0, "mg/dl", 8.1, 10.4, "-"),
    new Procedimiento("ASTO", 0, "UI/mL", 180, 200, "-"),
    new Procedimiento("PCR", 0, "mg/L", 24, 24, "-"),
    new Procedimiento("FR", 0, "UI/mL", 6, 8, "-"),
  ]

  widal: Examen[] = [
    new Examen("Salmonella O", ""),
    new Examen("Salmonella H", ""),
    new Examen("Paratífico A", ""),
    new Examen("Paratífico B", ""),
    new Examen("Proteux Ox-19", ""),
    new Examen("Brucella Abor", ""),
    new Examen("V.D.R.L", ""),
    new Examen("VIH", ""),
    new Examen("HIV", "")
  ];

  hemostasia: Examen[] = [
    new Examen("Tiempo de Sangría", "", "1-3 minutos"),
    new Examen("Tiempo de Coagulación", "", "5-7.5 minutos"),
    new Examen("T.P", "", "12-17 segundos"),
    new Examen("T.P.T", "", "30-45 segundos")
  ]

  invitro: Examen[] = [
    new Examen("Determinación Semicuantitativa Inmunológica In-Vitro de la Microalbuminuria", "")
  ]

  showInput: any = {};

  toggleInputElectro(index: number, event: any) {
    if (this.electrolitos[index]) {
      this.showInput[this.electrolitos[index].propiedad] = event.target.checked;
    } else {
      console.error('No existe un procedimiento con el índice ' + index);
    }
  }


  toggleInputWidal(index: number, event: any) {
    if (this.widal[index]) {
      this.showInput[this.widal[index].propiedad] = event.target.checked;
    } else {
      console.error('No existe un procedimiento con el índice ' + index);
    }
  }


  getFormData() {
    let data = {
      tuberculosisSerica: {
        propiedad: this.tuberculosisSerica.propiedad,
        resultado: this.tuberculosisSerica.resultado
      },
      electrolitos: this.electrolitos
        .filter(examen => this.showInput[examen.propiedad])
        .map(examen => (
          examen.calcularEstado(),
          {
            propiedad: examen.propiedad,
            resultado: examen.resultado,
            unidad: examen.unidad,
            estado: examen.estado,
            referencia: examen.referencia
          })),
      widal: this.widal
        .filter(examen => this.showInput[examen.propiedad])
        .map(examen => (
          {
            propiedad: examen.propiedad,
            resultado: examen.resultado,
          })),
      hemostasia: this.hemostasia
        .map(examen => (
          {
            propiedad: examen.propiedad,
            resultado: examen.resultado,
          })),
      invitro: this.invitro
        .map(examen => (
          {
            propiedad: examen.propiedad,
            resultado: examen.resultado,
          }))
    }
    console.log(data);
    return data;
  }

}
