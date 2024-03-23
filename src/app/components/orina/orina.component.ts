import { Component } from '@angular/core';
import { Examen } from '../../models/examen.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Procedimiento } from '../../models/procedimiento.model';

@Component({
  selector: 'app-orina',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './orina.component.html',
  styleUrl: './orina.component.css'
})
export class OrinaComponent {

  examenOrina: boolean = false;
  examentoxicologico: boolean = false;
  examenMICROALBUMINURIA: boolean = false;


  quimico: Examen[] = [
    new Examen('Color', ''),
    new Examen('Densidad', ''),
    new Examen('Ph', ''),
    new Examen('Leucocitos', ''),
    new Examen('Nitritos', ''),
    new Examen('Proteínas', ''),
    new Examen('Glucosa', ''),
    new Examen('Cetónico', ''),
    new Examen('Urobilinogeno', ''),
    new Examen('Bilirrubinas', ''),
    new Examen('Sangre', ''),
    new Examen('Hemoglobina', '')
  ];

  microscopico: Examen[] = [
    new Examen('Células epit', ''),
    new Examen('Hematíes', ''),
    new Examen('Piocitos', ''),
    new Examen('Bacterias', ''),
    new Examen('Bacilos', ''),
    new Examen('Cristales', ''),
    new Examen('F. mucoso', ''),
    new Examen('Levaduras', ''),
    new Examen('Trichonomas', ''),
    new Examen('Micelios', ''),
    new Examen('Cilindros', '')
  ]

  toxicologico: Examen[] = [
    new Examen('Cocaína (COC)', ''),
    new Examen('Éxtasis (MDMA)', ''),
    new Examen('Heroína (MOP)', ''),
    new Examen('Metadona (MTD)', ''),
    new Examen('Cannabis (Marihuana) (THC)', '')
  ];

  microalbuminuria: Procedimiento = new Procedimiento('Microalbuminuria', 0, 'ug / ml', 0, 15, '');

  showInput: any = {};


  toggleInputToxicologico(index: number, event: any) {
    if (this.toxicologico[index]) {
      this.showInput[this.toxicologico[index].propiedad] = event.target.checked;
    } else {
      console.error('No existe un procedimiento con el índice ' + index);
    }
  }


  getFormData() {
    let examenQuimicoData = [];
    let examenMicroscopicoData = [];

    if (this.examenOrina) {
      for (let examen of this.quimico) {
        examenQuimicoData.push({ propiedad: examen.propiedad, resultado: examen.resultado });
      }
      for (let examen of this.microscopico) {
        examenMicroscopicoData.push({ propiedad: examen.propiedad, resultado: examen.resultado });
      }
    }


    const toxicologicoData = this.toxicologico
      .filter(toxicologico => this.showInput[toxicologico.propiedad])
      .map(toxicologico => (
        {
          propiedad: toxicologico.propiedad,
          resultado: toxicologico.resultado,
        }));


    return ({
      examenQuimico: examenQuimicoData,
      examenMicroscopico: examenMicroscopicoData,
      procedimientos: toxicologicoData,
      microalbuminuria: this.examenMICROALBUMINURIA ? this.microalbuminuria : null
    });

  }
}
