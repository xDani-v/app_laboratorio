export class HematologiaModel {
  hematocrito: number = 0;
  hemoglobina: number = 0;
  hematies: number = 0;
  gBlancos: number = 0;
  neutrofilos: number = 0;
  linfocitos: number = 0;
  mid: number = 0;
  mcv: number = 0;
  mch: number = 0;
  mchc: number = 0;
  plaquetas: number = 0;

  //val ref
  hematocrito_ref: { min: number; max: number; } | undefined;
  hemoglobina_ref: { min: number; max: number; } | undefined;
  hematies_ref: { min: number; max: number; } | undefined;
  gBlancos_ref: { min: number; max: number; } | undefined;
  neutrofilos_ref: { min: number; max: number; } | undefined;
  linfocitos_ref: { min: number; max: number; } | undefined;
  mid_ref: { min: number; max: number; } | undefined;
  mcv_ref: { min: number; max: number; } | undefined;
  mch_ref: { min: number; max: number; } | undefined;
  mchc_ref: { min: number; max: number; } | undefined;
  plaquetas_ref: { min: number; max: number; } | undefined;

  //est
  hematocrito_est: string = "";
  hemoglobina_est: string = "";
  hematies_est: string = "";
  gBlancos_est: string = "";
  neutrofilos_est: string = "";
  linfocitos_est: string = "";
  mid_est: string = "";
  mcv_est: string = "";
  mch_est: string = "";
  mchc_est: string = "";
  plaquetas_est: string = "";

  compareWithReference(value: number, reference: { min: number, max: number }): string {
    if (value < reference.min) {
      return 'Bajo';
    } else if (value > reference.max) {
      return 'Elevado';
    } else {
      return 'Normal';
    }
  }
}