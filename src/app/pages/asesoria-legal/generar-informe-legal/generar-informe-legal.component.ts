import { Component, OnInit } from '@angular/core';
import { drawDOM, pdf } from "@progress/kendo-drawing";
import { AsesoriaService } from 'src/app/Services/asesoria.service';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import jsPDF from 'jspdf';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-generar-informe-legal',
  templateUrl: './generar-informe-legal.component.html',
  styleUrls: ['./generar-informe-legal.component.css']
})
export class GenerarInformeLegalComponent implements OnInit {
  informe: object;
  modalidad: string;
  fecha: string;

  constructor(
    private _asesoriaService: AsesoriaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this._asesoriaService.getInformeId(param['id']).subscribe(res => {
        console.log(res);
        this.fecha = moment.utc(res[0].fecha_inicio).format('DD/MM/YYYY');

        this.informe = res;
        if(res[0].modalidad_contratacion == 1) {
          this.modalidad = 'MENOR'
        } else {
          this.modalidad = 'MAYOR'
        }

      })
    })

  setTimeout(() => {
      this.exportPDF()
    }, 1000)
  }



  exportPDF() {
    var contents = $('#impreso')[0];
    const img = document.getElementById("impreso")
    drawDOM(contents, {
      forcePageBreak: ".page-break",
      paperSize: ['18in', '26in'],
      margin: { left: '5cm', top: '2cm', right: '3cm', bottom: '0cm' }
    }).then(function (group) {
      pdf.saveAs(group, "contrato.pdf");
    });
    //this.router.navigateByUrl('formulario-listado')
  }

}
