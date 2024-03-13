import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HematologiaModel } from '../../models/HematologiaModel';


@Component({
  selector: 'app-hematologia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hematologia.component.html',
  styleUrl: './hematologia.component.css'
})
export class HematologiaComponent implements OnInit {
  @Input() sexo: string = '';
  hematologia: HematologiaModel = new HematologiaModel();

  ngOnInit() {
    this.cargarValoresReferenciales();
  }

  cargarValoresReferenciales() {
    switch (this.sexo) {
      case 'Hombre adulto':
        this.hematologia.hematocrito_ref = { min: 45.0, max: 52.9 };
        this.hematologia.hemoglobina_ref = { min: 14.0, max: 17.4 };
        this.hematologia.hematies_ref = { min: 4500000, max: 5500000 };
        this.hematologia.gBlancos_ref = { min: 5000, max: 10000 };
        this.hematologia.neutrofilos_ref = { min: 50.0, max: 75.0 };
        this.hematologia.linfocitos_ref = { min: 25.0, max: 40.0 };
        this.hematologia.mid_ref = { min: 3.0, max: 7.0 };
        this.hematologia.mcv_ref = { min: 84.0, max: 96.0 };
        this.hematologia.mch_ref = { min: 27.0, max: 32.0 };
        this.hematologia.mchc_ref = { min: 30.0, max: 35.0 };
        this.hematologia.plaquetas_ref = { min: 150000, max: 400000 };
        break;
      case 'Mujer adulta':
        this.hematologia.hematocrito_ref = { min: 36.0, max: 48.0 };
        this.hematologia.hemoglobina_ref = { min: 12.0, max: 16.0 };
        this.hematologia.hematies_ref = { min: 4000000, max: 5100000 };
        this.hematologia.gBlancos_ref = { min: 4500, max: 10000 };
        this.hematologia.neutrofilos_ref = { min: 35.0, max: 75.0 };
        this.hematologia.linfocitos_ref = { min: 25.0, max: 48.0 };
        this.hematologia.mid_ref = { min: 3.0, max: 7.0 };
        this.hematologia.mcv_ref = { min: 76.0, max: 96.0 };
        this.hematologia.mch_ref = { min: 27.0, max: 32.0 };
        this.hematologia.mchc_ref = { min: 30.0, max: 35.0 };
        this.hematologia.plaquetas_ref = { min: 150000, max: 400000 };
        break;
      case 'Hombre Preescolar':
        this.hematologia.hematocrito_ref = { min: 30.0, max: 40.0 };
        this.hematologia.hemoglobina_ref = { min: 9.5, max: 14.1 };
        this.hematologia.hematies_ref = { min: 3900000, max: 5300000 };
        this.hematologia.gBlancos_ref = { min: 5000, max: 16000 };
        this.hematologia.neutrofilos_ref = { min: 20.0, max: 45.0 };
        this.hematologia.linfocitos_ref = { min: 46.0, max: 76.0 };
        this.hematologia.mid_ref = { min: 0.0, max: 5.0 };
        this.hematologia.mcv_ref = { min: 70.0, max: 84.0 };
        this.hematologia.mch_ref = { min: 23.0, max: 29.0 };
        this.hematologia.mchc_ref = { min: 31.0, max: 35.0 };
        this.hematologia.plaquetas_ref = { min: 150000, max: 450000 };
        // ...asignar el resto de los valores referenciales...
        break;
      case 'Mujer Preescolar':
        this.hematologia.hematocrito_ref = { min: 30.0, max: 40.0 };
        this.hematologia.hemoglobina_ref = { min: 9.5, max: 14.1 };
        this.hematologia.hematies_ref = { min: 3900000, max: 5300000 };
        this.hematologia.gBlancos_ref = { min: 5000, max: 16000 };
        this.hematologia.neutrofilos_ref = { min: 20.0, max: 45.0 };
        this.hematologia.linfocitos_ref = { min: 46.0, max: 76.0 };
        this.hematologia.mid_ref = { min: 0.0, max: 5.0 };
        this.hematologia.mcv_ref = { min: 70.0, max: 84.0 };
        this.hematologia.mch_ref = { min: 23.0, max: 29.0 };
        this.hematologia.mchc_ref = { min: 31.0, max: 35.0 };
        this.hematologia.plaquetas_ref = { min: 150000, max: 450000 };
        break;
    }
  }

  getHematologiaData(): HematologiaModel {
    let data = new HematologiaModel();
    data.hematocrito = this.hematologia.hematocrito;
    data.hemoglobina = this.hematologia.hemoglobina;
    data.hematies = this.hematologia.hematies;
    data.gBlancos = this.hematologia.gBlancos;
    data.neutrofilos = this.hematologia.neutrofilos;
    data.linfocitos = this.hematologia.linfocitos;
    data.mid = this.hematologia.mid;
    data.mcv = this.hematologia.mcv;
    data.mch = this.hematologia.mch;
    data.mchc = this.hematologia.mchc;
    data.plaquetas = this.hematologia.plaquetas;
    data.hematocrito_ref = this.hematologia.hematocrito_ref;
    data.hemoglobina_ref = this.hematologia.hemoglobina_ref;
    data.hematies_ref = this.hematologia.hematies_ref;
    data.gBlancos_ref = this.hematologia.gBlancos_ref;
    data.neutrofilos_ref = this.hematologia.neutrofilos_ref;
    data.linfocitos_ref = this.hematologia.linfocitos_ref;
    data.mid_ref = this.hematologia.mid_ref;
    data.mcv_ref = this.hematologia.mcv_ref;
    data.mch_ref = this.hematologia.mch_ref;
    data.mchc_ref = this.hematologia.mchc_ref;
    data.plaquetas_ref = this.hematologia.plaquetas_ref;
    data.hematocrito_est = data.compareWithReference(this.hematologia.hematocrito, this.hematologia.hematocrito_ref || { min: 0, max: 0 });
    data.hemoglobina_est = data.compareWithReference(this.hematologia.hemoglobina, this.hematologia.hemoglobina_ref || { min: 0, max: 0 });
    data.hematies_est = data.compareWithReference(this.hematologia.hematies, this.hematologia.hematies_ref || { min: 0, max: 0 });
    data.gBlancos_est = data.compareWithReference(this.hematologia.gBlancos, this.hematologia.gBlancos_ref || { min: 0, max: 0 });
    data.neutrofilos_est = data.compareWithReference(this.hematologia.neutrofilos, this.hematologia.neutrofilos_ref || { min: 0, max: 0 });
    data.linfocitos_est = data.compareWithReference(this.hematologia.linfocitos, this.hematologia.linfocitos_ref || { min: 0, max: 0 });
    data.mid_est = data.compareWithReference(this.hematologia.mid, this.hematologia.mid_ref || { min: 0, max: 0 });
    data.mcv_est = data.compareWithReference(this.hematologia.mcv, this.hematologia.mcv_ref || { min: 0, max: 0 });
    data.mch_est = data.compareWithReference(this.hematologia.mch, this.hematologia.mch_ref || { min: 0, max: 0 });
    data.mchc_est = data.compareWithReference(this.hematologia.mchc, this.hematologia.mchc_ref || { min: 0, max: 0 });
    data.plaquetas_est = data.compareWithReference(this.hematologia.plaquetas, this.hematologia.plaquetas_ref || { min: 0, max: 0 });
    return data;
  }

  submit() {

  }
}
