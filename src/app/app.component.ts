import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


import { imageBase64 } from './models/image';
import { HormonalModel } from './models/HormonalMode';

import { HematologiaComponent } from './components/hematologia/hematologia.component';
import { HormonalComponent } from './components/hormonal/hormonal.component';
import { SanguineaComponent } from './components/sanguinea/sanguinea.component';
import { TumoralComponent } from './components/tumoral/tumoral.component';
import { OrinaComponent } from './components/orina/orina.component';
import { HecesComponent } from './components/heces/heces.component';
import { InmunologiaComponent } from './components/inmunologia/inmunologia.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HematologiaComponent, HormonalComponent, SanguineaComponent, TumoralComponent, OrinaComponent, HecesComponent, InmunologiaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app_laboratorio';
  nombre: string = '';
  fecha: Date = new Date();
  edad: number = 0;
  doctor: string = '';
  hematologiaActivo: boolean = false;
  hormonalActivo: boolean = false;
  inmunologiaActivo: boolean = false;
  QuimicaActivo: boolean = false;
  MarcadorActivo: boolean = false;
  OrinaActivo: boolean = false;
  HecesActivo: boolean = false;



  @ViewChild(HematologiaComponent) HematologiaComponent!: HematologiaComponent;
  @ViewChild(HormonalComponent) HormonalComponent!: HormonalComponent;
  @ViewChild(TumoralComponent) TumoralComponent!: TumoralComponent;
  @ViewChild(OrinaComponent) OrinaComponent!: OrinaComponent;
  @ViewChild(HecesComponent) HecesComponent!: HecesComponent;
  @ViewChild(InmunologiaComponent) InmunologiaComponent!: InmunologiaComponent;

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
      let data: any = "";

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold'); // Establece la fuente en negrita
      doc.text('Examen de Hematología', 85, textY + 12);
      doc.setFont('helvetica'); // Vuelve a establecer la fuente en normal
      doc.setFontSize(10);


      let body: any[] = [];


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
      textY += (Object.keys(data).length + 1) * 3;
      doc.text('*MID: son las células como monocitos, eosinófilos, basófilos, reportados en un mismo valor.', 15, textY + 10);
      textY += 10
    }

    if (this.hormonalActivo) {
      let data: { [key: string]: HormonalModel } = this.HormonalComponent.getData();

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold'); // Establece la fuente en negrita
      doc.text('Examen Hormonal', 85, textY + 12);
      doc.setFont('helvetica'); // Vuelve a establecer la fuente en normal
      doc.setFontSize(10);

      let body: any[] = [];

      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let row: any[] = [];
          let value = data[key];
          row.push(value.name);
          row.push(`${value.result} ${value.unit}`);
          row.push(value.estado);
          row.push(`${value.reference.min} - ${value.reference.max}`);
          console.log('Adding row:', row);
          body.push(row);
        }
      }

      autoTable(doc, {
        head: [['Examen Hormonal', 'Resultado', 'Estado', 'Referencia']],
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
      textY += (Object.keys(data).length + 1);
    }

    doc.save('hematologia.pdf');
  }
}

