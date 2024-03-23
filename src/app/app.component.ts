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
import { Procedimiento } from './models/procedimiento.model';
import { Examen } from './models/examen.model';


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
  @ViewChild(SanguineaComponent) SanguineaComponent!: SanguineaComponent;

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
    var pageHeight = 295;

    // Función para agregar una página y una imagen en una posición dada
    function addImageToPage(x: number) {
      doc.addImage(imageBase64, 'PNG', x, y, imgWidth, imgHeight);
      y = y + imgHeight + 5;
    }

    function calculateEstimatedHeight(data: any) {
      // Ajusta según el número de filas de datos y otros elementos (como espacios y encabezados)
      return data.length * 10 + 15;
    }

    // Función para centrar texto en la página
    function centerText(text: string, y: number) {
      const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(text, textOffset, y);
    }

    // Función para agregar información de paciente
    const addPatientInfo = () => {
      doc.setFontSize(11);
      doc.setFont('helvetica');
      doc.text(`Nombre: ${this.nombre}`, 15, y);
      doc.text(`Edad: ${this.edad} Años`, 140, y);
      let fechaFormateada = new Date(this.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      y += 5;
      doc.text(`Fecha: ${fechaFormateada}`, 15, y);
      doc.text(`Doctor: ${this.doctor}`, 140, y);
      y += 10;
    }

    //tabla de procedimiento
    function addProcedimientoInfo(header: string, data: Procedimiento[]) {
      const estimatedHeight = calculateEstimatedHeight(data);
      if (y + estimatedHeight > pageHeight) {
        doc.addPage();
        y = 5; // Reinicia la posición Y en la nueva página
        addImageToPage(10);
      }
      y += 2;
      doc.setFont('helvetica', 'bold');
      centerText(header, y);
      doc.setFont('helvetica');
      const tableOptions = {
        head: [['Examen', 'Resultado', 'Unidad', 'Estado', 'Referencia']],
        body: data.map(item => [item.propiedad, item.resultado + " " + item.unidad, item.unidad, item.estado, item.referencia.min + ' - ' + item.referencia.max + " " + item.unidad]),
        startY: y + 5,
        styles: {
          fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number], lineColor: [255, 255, 255] as [number, number, number]
        },
        columnStyles: {
          0: { fillColor: [255, 255, 255] as [number, number, number] },
          1: { fillColor: [255, 255, 255] as [number, number, number] },
          2: { fillColor: [255, 255, 255] as [number, number, number] },
          3: { fillColor: [255, 255, 255] as [number, number, number] },
          4: { fillColor: [255, 255, 255] as [number, number, number] }
        },
        headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] },
      };
      autoTable(doc, tableOptions);
      y = y + tableOptions.body.length * 10 + 12;
    }

    function addExamenInfo(title: string, data: Examen[]) {
      const estimatedHeight = calculateEstimatedHeight(data);
      if (y + estimatedHeight > pageHeight) {
        doc.addPage();
        y = 5; // Reinicia la posición Y en la nueva página
        addImageToPage(10);
      }
      y += 2; // Ajustar la posición Y para dejar espacio para el texto
      centerText(title, y);
      doc.setFont('helvetica');
      const tableOptions = {
        head: [['Propiedad', 'Resultado']],
        body: data.map(examen => [examen.propiedad, examen.resultado]),
        startY: y + 5,
        styles: {
          fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number], lineColor: [255, 255, 255] as [number, number, number]
        },
        columnStyles: {
          0: { fillColor: [255, 255, 255] as [number, number, number] }, // Primera columna blanca
          1: { fillColor: [255, 255, 255] as [number, number, number] }, // Segunda columna blanca
        },
        headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] }
      };
      autoTable(doc, tableOptions);
      y = y + tableOptions.body.length * 10 + 12;
    }

    function addExamenObsInfo(title: string, data: Examen[]) {
      const estimatedHeight = calculateEstimatedHeight(data);
      if (y + estimatedHeight > pageHeight) {
        doc.addPage();
        y = 5; // Reinicia la posición Y en la nueva página
        addImageToPage(10);
      }
      y += 2; // Ajustar la posición Y para dejar espacio para el texto
      centerText(title, y);
      doc.setFont('helvetica');
      const tableOptions = {
        head: [['Propiedad', 'Resultado', 'Valor']],
        body: data.map(examen => [examen.propiedad, examen.resultado, examen.observaciones]),
        startY: y + 5,
        styles: {
          fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number], lineColor: [255, 255, 255] as [number, number, number]
        },
        columnStyles: {
          0: { fillColor: [255, 255, 255] as [number, number, number] }, // Primera columna blanca
          1: { fillColor: [255, 255, 255] as [number, number, number] }, // Segunda columna blanca
          2: { fillColor: [255, 255, 255] as [number, number, number] },
        },
        headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] }
      };
      autoTable(doc, {
        ...tableOptions,
        body: tableOptions.body.map(row => row.map(cell => cell || '')) // Replace undefined values with empty string
      });
      y = y + tableOptions.body.length * 10 + 12;
    }

    function addHecesPrint(title: string, data: String[]) {
      const estimatedHeight = calculateEstimatedHeight(data);
      if (y + estimatedHeight > pageHeight) {
        doc.addPage();
        y = 5; // Reinicia la posición Y en la nueva página
        addImageToPage(10);
      }
      y += 2; // Ajustar la posición Y para dejar espacio para el texto
      centerText(title, y);
      doc.setFont('helvetica');
      const tableOptions = {
        head: [['Valores encontrados']],
        body: data.map(item => [item]),
        startY: y + 5,
        styles: {
          fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number], lineColor: [255, 255, 255] as [number, number, number]
        },
        columnStyles: {
          0: { fillColor: [255, 255, 255] as [number, number, number] }, // Primera columna blanca
        },
        headStyles: { fillColor: [255, 255, 255] as [number, number, number], textColor: [0, 0, 0] as [number, number, number] }
      };
      autoTable(doc, tableOptions as any);
      y = y + tableOptions.body.length * 10 + 12;
    }



    //documento general
    doc.addImage(imageBase64, 'PNG', 10, y, imgWidth, imgHeight);
    y += imgHeight + 5;

    addPatientInfo();

    //hemograma
    if (this.hematologiaActivo) {
      const procedimientosData: Procedimiento[] = this.HematologiaComponent.getFormData().procedimientos.map(item => ({
        ...item,
        calcularEstado() {
          if (this.resultado < this.referencia.min) {
            this.estado = "Bajo";
          } else if (this.resultado > this.referencia.max) {
            this.estado = "Elevado";
          } else {
            this.estado = "";
          }
        }
      }));
      addProcedimientoInfo('Hemograma', procedimientosData);
    }

    //inmunologias
    if (this.inmunologiaActivo) {
      if (this.InmunologiaComponent.inmunologia_check) {
        const tuberculosisSericaData: Examen[] = [this.InmunologiaComponent.getFormData().tuberculosisSerica];
        addExamenInfo('METODO: Inmunocromatografia', tuberculosisSericaData);
      }
      if (this.InmunologiaComponent.electrolitos_check) {
        const electrolitosData: Procedimiento[] = this.InmunologiaComponent.getFormData().electrolitos.map(item => ({
          ...item,
          calcularEstado() {
            if (this.resultado < this.referencia.min) {
              this.estado = "Bajo";
            } else if (this.resultado > this.referencia.max) {
              this.estado = "Elevado";
            } else {
              this.estado = "";
            }
          }
        }));
        addProcedimientoInfo('Electrolitos', electrolitosData);
      }
      if (this.InmunologiaComponent.reaccionWidal_check) {
        addExamenObsInfo('Reaccion de Widal', this.InmunologiaComponent.getFormData().widal);
      }
      if (this.InmunologiaComponent.hemostasia_check) {
        addExamenInfo('Hemostasia', this.InmunologiaComponent.getFormData().hemostasia);
      }
      if (this.InmunologiaComponent.invitro_check) {
        addExamenInfo('In-Vitro', this.InmunologiaComponent.getFormData().invitro);
      }
    }

    //quimica sanguinea
    if (this.QuimicaActivo) {
      const formData = this.SanguineaComponent.getFormData();
      if (formData.procedimientos.length > 0) {
        addProcedimientoInfo('Quimica Sanguinea', formData.procedimientos.map(item => ({
          ...item,
          calcularEstado() {
            if (this.resultado < this.referencia.min) {
              this.estado = "Bajo";
            } else if (this.resultado > this.referencia.max) {
              this.estado = "Elevado";
            } else {
              this.estado = "";
            }
          }
        })));
      }
      if (formData.enzimas.length > 0) {
        const enzimasData: Procedimiento[] = formData.enzimas.map(item => ({
          ...item,
          calcularEstado() {
            if (this.resultado < this.referencia.min) {
              this.estado = "Bajo";
            } else if (this.resultado > this.referencia.max) {
              this.estado = "Elevado";
            } else {
              this.estado = "";
            }
          }
        }));
        addProcedimientoInfo('Enzimas', enzimasData);
      }
      if (formData.electrolitos.length > 0) {
        const electrolitosData: Procedimiento[] = formData.electrolitos.map(item => ({
          ...item,
          calcularEstado() {
            if (this.resultado < this.referencia.min) {
              this.estado = "Bajo";
            } else if (this.resultado > this.referencia.max) {
              this.estado = "Elevado";
            } else {
              this.estado = "";
            }
          }
        }));
        addProcedimientoInfo('Electrolitos', electrolitosData);
      }
    }

    //hormonas
    if (this.hormonalActivo) {
      addProcedimientoInfo('Hormonas', this.HormonalComponent.getFormData().procedimientos.map(item => ({
        ...item,
        calcularEstado() {
          if (this.resultado < this.referencia.min) {
            this.estado = "Bajo";
          } else if (this.resultado > this.referencia.max) {
            this.estado = "Elevado";
          } else {
            this.estado = "";
          }
        }
      })));
    }
    //Marcadores tumorales
    if (this.MarcadorActivo) {
      const marcadoresData: Procedimiento[] = this.TumoralComponent.getFormData().procedimientos.map(item => ({
        ...item,
        calcularEstado() {
          if (this.resultado < this.referencia.min) {
            this.estado = "Bajo";
          } else if (this.resultado > this.referencia.max) {
            this.estado = "Elevado";
          } else {
            this.estado = "";
          }
        }
      }));
      addProcedimientoInfo('Marcadores Tumorales', marcadoresData);
    }
    //Orina
    if (this.OrinaActivo) {
      if (this.OrinaComponent.examenOrina) {
        if (this.OrinaComponent.getFormData().examenQuimico.length > 0) {
          addExamenInfo('Examen quimico de orina', this.OrinaComponent.getFormData().examenQuimico);
        }
        if (this.OrinaComponent.getFormData().examenMicroscopico.length > 0) {
          addExamenInfo('Examen microscopico de orina', this.OrinaComponent.getFormData().examenMicroscopico);
        }
      }
      if (this.OrinaComponent.examentoxicologico) {
        addExamenInfo('Cultivo de orina', this.OrinaComponent.getFormData().procedimientos);
      }
      if (this.OrinaComponent.examenMICROALBUMINURIA) {
        const formData = this.OrinaComponent.getFormData();
        if (formData.microalbuminuria !== null) {
          addProcedimientoInfo('Microalbuminuria', [formData.microalbuminuria]); // Wrap formData.microalbuminuria inside an array
        }
      }
    }
    //Heces
    if (this.HecesActivo) {
      if (this.HecesComponent.helicobacter) {
        addExamenInfo('HELICOBACTER PYLORI', [this.HecesComponent.getFormData().helicobacterpiloty]);
      }
      if (this.HecesComponent.examenHeces) {
        addExamenInfo('Examen de Heces', this.HecesComponent.getFormData().Heces);
      }
      if (this.HecesComponent.examenCoproparasitario) {
        addHecesPrint('Trofozoito', this.HecesComponent.getFormData().selectedTrofozoito);
        addHecesPrint('LarvaHuevo', this.HecesComponent.getFormData().selectedLarvaHuevo);
      }
      if (this.HecesComponent.examenRotavirusHeces) {
        addExamenInfo('Examen Rotavirus Heces', [this.HecesComponent.getFormData().rotavirusHeces]);
      }

      if (this.HecesComponent.examenEDA) {
        addExamenInfo('Examen-EDA', this.HecesComponent.getFormData().eda);
      }
      if (this.HecesComponent.examenPiloryHeces) {
        addProcedimientoInfo('Examen Pilory Heces', [{
          ...this.HecesComponent.getFormData().helicobacterPylori,
          estado: "", // Fix: Set the 'estado' property to an empty string
          calcularEstado() {
            if (this.resultado < this.referencia.min) {
              this.estado = "Bajo";
            } else if (this.resultado > this.referencia.max) {
              this.estado = "Elevado";
            } else {
              this.estado = "";
            }
          }
        }]); // Wrap the object inside an array
      }
    }
    // Guarda el PDF
    doc.save('doc.pdf');
  }


}

