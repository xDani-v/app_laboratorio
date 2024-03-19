import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Examen } from '../../models/examen.model';

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


  getFormData() {
    let data = {
      helicobacterpiloty: this.helicobacterpiloty,
      Heces: this.Heces.map(examen => ({ propiedad: examen.propiedad, resultado: examen.resultado })),
      selectedTrofozoito: this.selectedTrofozoito,
      selectedLarvaHuevo: this.selectedLarvaHuevo
    }
    console.log(data);
    return data;
  }
}
