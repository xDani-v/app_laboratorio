import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HematologiaComponent } from './components/hematologia/hematologia.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { HematologiaModel } from './models/HematologiaModel';
import { imageBase64 } from './models/image';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HematologiaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app_laboratorio';
  nombre: string = '';
  fecha: Date = new Date();
  edad: number = 0;
  doctor: string = '';
  sexo: string = '';
  hematologiaActivo: boolean = false;
  orina: boolean = false;

  @ViewChild(HematologiaComponent) hematologiaComponent!: HematologiaComponent;




  submitForm() {


    const units = {
      hematocrito: '%',
      hemoglobina: 'g%',
      hematies: 'xmm3',
      gBlancos: 'xmm3',
      neutrofilos: '%',
      linfocitos: '%',
      mid: '%',
      mcv: '',
      mch: '',
      mchc: '',
      plaquetas: 'xmm3'
    };

    var doc = new jsPDF();
    // Calcula las dimensiones de la imagen para mantener la relación de aspecto
    var imgWidth = 200; // Ancho de la imagen en el PDF
    var imgHeight = imgWidth * 476 / 2000; // Altura de la imagen en el PDF

    // Agrega la imagen al documento
    doc.addImage(imageBase64, 'PNG', 10, 5, imgWidth, imgHeight);
    doc.setFont('helvetica');
    doc.setFontSize(10);

    // Define el espacio entre la imagen y el texto
    var padding = 3;

    // Ajusta las coordenadas y del texto
    var textY = 3 + imgHeight + padding;

    doc.setFontSize(10);

    //datos
    doc.text(`Nombre: ${this.nombre}`, 15, textY);
    doc.text(`Edad: ${this.edad} Años`, 140, textY);
    let fechaFormateada = new Date(this.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Fecha: ${fechaFormateada}`, 15, textY + 10);
    doc.text(`Doctor: ${this.doctor}`, 140, textY + 10);
    doc.setDrawColor(169, 169, 169); // Establece el color de dibujo en gris
    doc.setLineWidth(0.3); // Establece el ancho de la línea en 0.5
    doc.line(15, textY + 15, 195, textY + 15);
    textY += 10;

    if (this.hematologiaActivo) {
      let data: HematologiaModel = this.hematologiaComponent.getHematologiaData();

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold'); // Establece la fuente en negrita
      doc.text('Examen de Hematología', 85, textY + 12);
      doc.setFont('helvetica'); // Vuelve a establecer la fuente en normal
      doc.setFontSize(10);


      let body: any[] = [];

      for (let key in data) {
        if (data.hasOwnProperty(key) && !key.endsWith('_ref') && !key.endsWith('_est')) {
          let row: any[] = [];
          row.push(key);
          let value = data[key as keyof HematologiaModel];
          if (key in units) {
            let unit = units[key as keyof typeof units];
            row.push(`${value} ${unit}`);
          } else {
            row.push(value);
          }
          row.push(data[(key + '_est') as keyof HematologiaModel]);
          let ref = data[(key + '_ref') as keyof HematologiaModel];
          if (ref && typeof ref === 'object' && 'min' in ref && 'max' in ref) {
            row.push(`${ref.min} - ${ref.max}`);
          } else {
            row.push(ref);
          }
          console.log('Adding row:', row);
          body.push(row);
        }
      }

      autoTable(doc, {
        head: [['Hemograma', 'Resultado', 'Estado', 'Referencia']],
        body: body,
        startY: textY + 15,
        styles: { fillColor: [255, 255, 255], textColor: [50, 50, 50], lineColor: [187, 187, 187] }, // celdas blancas, texto gris oscuro, bordes grises
        columnStyles: {
          0: { fillColor: [255, 255, 255] }, // primera columna blanca
          1: { fillColor: [255, 255, 255] }, // segunda columna blanca
          2: { fillColor: [255, 255, 255] },  // tercera columna blanca
          3: { fillColor: [255, 255, 255] }  // tercera columna blanca
        },
        headStyles: { fillColor: [173, 216, 230], textColor: [0, 0, 0] }, // cabecera azul claro, texto negro
        theme: 'grid'
      });
    }

    doc.save('hematologia.pdf');
  }
}

