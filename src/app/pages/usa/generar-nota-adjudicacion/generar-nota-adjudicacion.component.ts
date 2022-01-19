import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsaService } from 'src/app/Services/usa.service';
import { NumeroALetra } from '../../tools/NumeroALetra';
import { drawDOM, pdf } from "@progress/kendo-drawing";

import * as moment from 'moment';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-generar-nota-adjudicacion',
  templateUrl: './generar-nota-adjudicacion.component.html',
  styleUrls: ['./generar-nota-adjudicacion.component.css']
})
export class GenerarNotaAdjudicacionComponent implements OnInit {
  id: number;
  fecha: string;
  fechaInicio: string;
  getPoas: object;
  sueldoLetra: string;
  docs: object;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _usaService: UsaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.exportPDF()
    }, 500)

    setTimeout(() => {
      this.router.navigate(['/poa-listado'])
    }, 1000)

    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      var c = 0;
      this._usaService.getReqPoa(this.id).subscribe(res => {
        console.log(res);
        this.sueldoLetra = NumeroALetra.NumeroALetras(res[0].sueldo, 0)
        // Fecha actual
        const meses = ["",
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
        ]
        this.getPoas = res
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(1, '0');
        // Fecha inicio del contrato
        const input = res[0].fecha_inicio
        const date = moment.utc(input).format('YYYY-M-DD');
        const sep = date.split('-');
        const dia = sep[2]
        const mes = sep[1]
        const anio = sep[0]

        this.fechaInicio = `${dia} de ${meses[mes]} de ${anio}`;
        this.fecha = `${dd} de ${meses[mm]} de ${res[0].gestion}`;
        this.docs = (res[0].documentos_presentar).split(';')
      })

    })
  }
  exportPDF() {
    let randomNumber = Math.floor(100000000 + Math.random() * 900000000); 
    var contents = $('#impreso')[0];
    const img = document.getElementById("impreso")
    drawDOM(contents, {
      forcePageBreak: ".page-break",
      paperSize: ['18in', '26in'],
      margin: { left: '3cm', top: '2.5cm', right: '3cm', bottom: '2cm' }
    }).then(function (group) {
     // pdf.saveAs(group, "nota_adjudicacion.pdf");
      pdf.saveAs(group, `${randomNumber}.pdf`);

    });
  }

}
