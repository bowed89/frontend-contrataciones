import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from 'src/app/Services/planificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { drawDOM, pdf } from "@progress/kendo-drawing";

import * as moment from 'moment';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-formulario-poa',
  templateUrl: './formulario-poa.component.html',
  styleUrls: ['./formulario-poa.component.css']
})
export class FormularioPoaComponent implements OnInit {
  getDatas: object;
  fecha: string;
  id: number;

  year: string = moment().format('YYYY');


  constructor(
    private activatedRoute: ActivatedRoute,
    private _planificacionService: PlanificacionService,
    private router: Router
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.exportPDF()
    }, 500)

    setTimeout(() => {
      this.router.navigate(['fuc-listado'])
    }, 1000)

    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];

      this._planificacionService.getPoaId(this.id).subscribe(res => {
        this.getDatas = res;
        console.log(this.getDatas);
        const getFecha = res[0].fecha_solicitud;
        const date = moment.utc(getFecha).format('DD/M/YYYY');
        const meses = ["",
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
        ]
        const sep = date.split('/');
        const dia = sep[0]
        const mes = sep[1]
        const anio = sep[2]
        this.fecha = `${dia}/${meses[mes]}/${anio}`;
      })

    })
  }
  exportPDF() {
    var contents = $('#impreso')[0];
    const img = document.getElementById("impreso")
    drawDOM(contents, {
      forcePageBreak: ".page-break",
      paperSize: ['18in', '26in'],
      margin: { left: '3cm', top: '2.5cm', right: '3cm', bottom: '2cm' }
    }).then(function (group) {
      pdf.saveAs(group, "poa.pdf");
    });
  }

}
