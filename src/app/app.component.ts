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
import 'jspdf-autotable';


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

  calculateValue(num: number) {

    if (num <= 3) {
      return 13;
    } else if (length > 3 && length <= 6) {
      return 10;
    } else if (length >= 7 && length <= 10) {
      return 5;
    } else {
      return -2;
    }
  }

  submitForm() {
    var doc = new jsPDF();
    var imgWidth = 200;
    var imgHeight = imgWidth * 476 / 2000;
    var y = 5;


    doc.addImage(imageBase64, 'PNG', 10, y, imgWidth, imgHeight);
    y += imgHeight + 5;



    function checkPage(val1: number) {
      var totaly = y + val1;
      if (totaly >= doc.internal.pageSize.height) {
        doc.addPage();
        y = 5; // Restablece la posición vertical para la nueva página
        doc.addImage(imageBase64, 'PNG', 10, y, imgWidth, imgHeight);
        y = imgHeight + 5;
      }
    }

    function centerText(text: string, y: number) {
      const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(text, textOffset, y);
    }

    //informacion de la fuente
    doc.setFontSize(11);
    doc.setFont('helvetica');
    //informacion general
    doc.text(`Nombre: ${this.nombre}`, 15, y);
    doc.text(`Edad: ${this.edad} Años`, 140, y);
    let fechaFormateada = new Date(this.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    y += 5;
    doc.text(`Fecha: ${fechaFormateada}`, 15, y);
    doc.text(`Doctor: ${this.doctor}`, 140, y);


    //hemograma
    if (this.hematologiaActivo) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('HEMATOLOGIA', 85, y);
      doc.setFont('helvetica');
      const procedimientosData = this.HematologiaComponent.getFormData().procedimientos;
      console.log(procedimientosData)
      const tableOptions = {
        head: [['Examen', 'Resultado', 'Unidad', 'Estado', 'Referencia']],
        body: procedimientosData.map((item: any) => [item.propiedad, item.resultado + " " + item.unidad, item.unidad, item.estado, item.referencia.min + ' - ' + item.referencia.max + " " + item.unidad]),
        startY: y + 5,
        styles: {
          fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number]
          , lineColor: [255, 255, 255] as [number, number, number]
        }, // celdas blancas, texto gris oscuro, bordes grises
        columnStyles: {
          0: { fillColor: [255, 255, 255] as [number, number, number] }, // primera columna blanca
          1: { fillColor: [255, 255, 255] as [number, number, number] }, // segunda columna blanca
          2: { fillColor: [255, 255, 255] as [number, number, number] },  // tercera columna blanca
          3: { fillColor: [255, 255, 255] as [number, number, number] }, // tercera columna blanca
          4: { fillColor: [255, 255, 255] as [number, number, number] }
        },
        headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] },
      };
      var aun = this.calculateValue(tableOptions.body.length);
      var temp1 = y + tableOptions.body.length * 10 + aun;
      checkPage(temp1);
      autoTable(doc, tableOptions);
      doc.setFont('helvetica');
      doc.text("MID: son las células como monocitos, eosinófilos, basófilos, reportados en un solo valor.", 15, temp1);
      y = y + tableOptions.body.length * 10 + 15;


    }

    //examenes de inmunologia
    if (this.inmunologiaActivo) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      //doc.text('INMUNOLOGIA', 85, y);
      centerText('INMUNOLOGIA', y);
      //tuberculosis serica
      if (this.InmunologiaComponent.inmunologia_check) {
        y += 4; // Move the y coordinate down to make space for the new text
        //doc.text('METODO: Inmunocromatografia.', 70, y);
        centerText('METODO: Inmunocromatografia', y);
        doc.setFont('helvetica');
        const inmunologiaData = this.InmunologiaComponent.getFormData();
        const tableOptions = {
          head: [['Propiedad', 'Resultado']],
          body: [[inmunologiaData.tuberculosisSerica.propiedad, inmunologiaData.tuberculosisSerica.resultado]],
          startY: y + 5,
          styles: {
            fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number]
            , lineColor: [255, 255, 255] as [number, number, number]
          }, columnStyles: {
            0: { fillColor: [255, 255, 255] as [number, number, number] }, // primera columna blanca
            1: { fillColor: [255, 255, 255] as [number, number, number] }, // segunda columna blanca
          },
          headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] }
        };
        var temp1 = y + tableOptions.body.length * 10;
        checkPage(temp1);
        autoTable(doc, tableOptions);
        y = y + tableOptions.body.length * 10 + 15;

      }

      //electrolitos
      if (this.InmunologiaComponent.electrolitos_check) {
        y += 4; // Move the y coordinate down to make space for the new text

        centerText('Electrolitos', y);
        doc.setFont('helvetica');
        const electrolitosData = this.InmunologiaComponent.getFormData();
        const tableOptions = {
          head: [['Examen', 'Resultado', 'Unidad', 'Estado', 'Referencia']],
          body: electrolitosData.electrolitos.map((item: any) => [item.propiedad, item.resultado + " " + item.unidad, item.unidad, item.estado, item.referencia.min + ' - ' + item.referencia.max + " " + item.unidad]),
          startY: y + 5,
          styles: {
            fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number]
            , lineColor: [255, 255, 255] as [number, number, number]
          }, // celdas blancas, texto gris oscuro, bordes grises
          columnStyles: {
            0: { fillColor: [255, 255, 255] as [number, number, number] }, // primera columna blanca
            1: { fillColor: [255, 255, 255] as [number, number, number] }, // segunda columna blanca
            2: { fillColor: [255, 255, 255] as [number, number, number] },  // tercera columna blanca
            3: { fillColor: [255, 255, 255] as [number, number, number] }, // tercera columna blanca
            4: { fillColor: [255, 255, 255] as [number, number, number] }
          },
          headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] },
        };
        var temp1 = y + tableOptions.body.length * 10;
        checkPage(temp1);
        autoTable(doc, tableOptions);
        y = y + tableOptions.body.length * 10 + 15;

      }
      //widal
      if (this.InmunologiaComponent.reaccionWidal_check) {
        y += 4; // Move the y coordinate down to make space for the new text

        centerText('Reaccion de widal', y);
        doc.setFont('helvetica');
        const datawidal = this.InmunologiaComponent.getFormData().widal;
        const tableOptions = {
          head: [['Propiedad', 'Resultado']],
          body: datawidal.map(examen => [examen.propiedad, examen.resultado]),
          startY: y + 5,
          styles: {
            fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number]
            , lineColor: [255, 255, 255] as [number, number, number]
          }, columnStyles: {
            0: { fillColor: [255, 255, 255] as [number, number, number] }, // primera columna blanca
            1: { fillColor: [255, 255, 255] as [number, number, number] }, // segunda columna blanca
          },
          headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] }
        };
        var temp1 = y + tableOptions.body.length * 10;
        checkPage(temp1);
        autoTable(doc, tableOptions);
        y = y + tableOptions.body.length * 10 + 15;

      }
      //hemostasia
      if (this.InmunologiaComponent.hemostasia_check) {
        y += 4; // Move the y coordinate down to make space for the new text

        centerText('Hemostacia', y);
        doc.setFont('helvetica');
        const datahemostacia = this.InmunologiaComponent.getFormData().hemostasia;
        const tableOptions = {
          head: [['Propiedad', 'Resultado']],
          body: datahemostacia.map(examen => [examen.propiedad, examen.resultado]),
          startY: y + 5,
          styles: {
            fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number]
            , lineColor: [255, 255, 255] as [number, number, number]
          }, columnStyles: {
            0: { fillColor: [255, 255, 255] as [number, number, number] }, // primera columna blanca
            1: { fillColor: [255, 255, 255] as [number, number, number] }, // segunda columna blanca
          },
          headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] }
        };
        var temp1 = y + tableOptions.body.length * 10;
        checkPage(temp1);
        autoTable(doc, tableOptions);
        y = y + tableOptions.body.length * 10 + 15;

      }
      //invitro
      if (this.InmunologiaComponent.hemostasia_check) {
        y += 4; // Move the y coordinate down to make space for the new text

        centerText('Invitro', y);
        doc.setFont('helvetica');
        const datainvitro = this.InmunologiaComponent.getFormData().invitro;
        const tableOptions = {
          head: [['Propiedad', 'Resultado']],
          body: datainvitro.map(examen => [examen.propiedad, examen.resultado]),
          startY: y + 5,
          styles: {
            fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number]
            , lineColor: [255, 255, 255] as [number, number, number]
          }, columnStyles: {
            0: { fillColor: [255, 255, 255] as [number, number, number] }, // primera columna blanca
            1: { fillColor: [255, 255, 255] as [number, number, number] }, // segunda columna blanca
          },
          headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] }
        };
        var temp1 = y + tableOptions.body.length * 10;
        checkPage(temp1);
        autoTable(doc, tableOptions);
        y = y + tableOptions.body.length * 10 + 15;

      }
    }


    // Guarda el PDF
    doc.save('prueba.pdf');
  }



}

