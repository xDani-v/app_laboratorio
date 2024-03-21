import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Examen } from '../../models/examen.model';
import { Procedimiento } from '../../models/procedimiento.model';

@Component({
  selector: 'app-heces',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './heces.component.html',
  styleUrl: './heces.component.css'
})
export class HecesComponent {

  helicobacter: boolean = false;
  examenCoproparasitario: boolean = false;
  examenHeces: boolean = false;
  examenEDA: boolean = false;
  examenPiloryHeces: boolean = false;
  examenRotavirusHeces: boolean = false;

  rotavirusHeces = new Examen("ROTAVIRUS", "");

  helicobacterpiloty: Examen = new Examen("DETERMINACIÓN  CUALITATIVA  DE  HELICOBACTER   PYLORI  EN HECES", "");

  Heces: Examen[] = [
    new Examen("CONSISTENCIA", ""),
    new Examen("COLOR", ""),
    new Examen("FLORA BACTERIANA", ""),
    new Examen("MICELIOS", "")
  ];

  trofozoitoItems: string[] = ['Entoameba Histolytica', 'entoamebacoli', 'Iodamebabutschlii', 'Endolimax nana', 'Blastocitis Hominis', 'Giardia Lamblia', 'trichonomas hominis', 'chilomastixmesnile', 'balantidumcoli'];
  selectedTrofozoito: string[] = [];

  larvaHuevoItems: string[] = ['trichuristrichiura', 'Ascarislumbricoides', 'Ankilostoneduodenale', 'Enterobius vermicularis', 'Hymenolepis nana', 'Hymenolepis diminuta', 'Taeniasaginata', 'Taeniasolium', 'Strongyloidesstercolaris'];
  selectedLarvaHuevo: string[] = [];

  edas: Examen[] = [
    { propiedad: 'CONSISTENCIA', resultado: 'Blanda' },
    { propiedad: 'LEVADURAS', resultado: 'Escasas' },
    { propiedad: 'COLOR', resultado: 'Amarilla' },
    { propiedad: 'AZUCARES REDUCTOR', resultado: '-' },
    { propiedad: 'Ph', resultado: '5' },
    { propiedad: 'ESTEATORREA', resultado: '-' },
    { propiedad: 'SANGRE OCULTA', resultado: '-' },
    { propiedad: 'PREDOMINIO', resultado: 'Mononucleares' },
    { propiedad: 'FLORA BACTERIANA', resultado: 'Lig. Aumentada' },
    { propiedad: 'MOCO', resultado: 'Negativo' },
    { propiedad: 'MICELIOS', resultado: '-' },
    { propiedad: 'LEUCOCITOS', resultado: '0-1 x C.' },
    { propiedad: 'RESTOS ALIMENTICIOS', resultado: '' },
    { propiedad: 'HEMATIES', resultado: '0-1 x C.' },
    { propiedad: 'TIVO', resultado: '' }
  ];

  helicobacterPylori = new Procedimiento(
    'DETERMINACION DE HELICOBACTER PYLORI EN HECES',
    0,
    'UI/mL',
    0,
    0.130,
    "-",
    'Se consideran Positivos para Helicobacter Pylori a índices mayores a 0.130'
  );

  getFormData() {
    let data = {
      helicobacterpiloty: this.helicobacterpiloty,
      Heces: this.Heces.map(examen => ({ propiedad: examen.propiedad, resultado: examen.resultado })),
      selectedTrofozoito: this.selectedTrofozoito,
      selectedLarvaHuevo: this.selectedLarvaHuevo,
      rotavirusHeces: {
        propiedad: this.rotavirusHeces.propiedad,
        resultado: this.rotavirusHeces.resultado
      },
      eda: this.edas.map(examen => ({ propiedad: examen.propiedad, resultado: examen.resultado })),
      helicobacterPylori: {
        propiedad: this.helicobacterPylori.propiedad,
        resultado: this.helicobacterPylori.resultado,
        unidad: this.helicobacterPylori.unidad,
        estado: this.helicobacterPylori.calcularEstado(),
        referencia: this.helicobacterPylori.referencia,
        observaciones: this.helicobacterPylori.observaciones
      }
    }
    console.log(data);
    return data;
  }
}
