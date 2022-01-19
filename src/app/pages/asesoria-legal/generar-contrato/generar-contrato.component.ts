import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsesoriaService } from 'src/app/Services/asesoria.service';

import { drawDOM, pdf } from "@progress/kendo-drawing";
import { NumeroALetra } from '../../tools/NumeroALetra';
import * as moment from 'moment';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-generar-contrato',
  templateUrl: './generar-contrato.component.html',
  styleUrls: ['./generar-contrato.component.css']
})
export class GenerarContratoComponent implements OnInit {
  notaItems: any;
  diaMes: string;
  fechaInicio: string;
  montoNumero: string;

  title = 'app';
  elementType = 'url';
  value: string;

  year: string = moment().format('YYYY');

  constructor(
    private activatedRoute: ActivatedRoute,
    private _asesoriaService: AsesoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this._asesoriaService.getNotaById(param['id']).subscribe(res => {
        console.log('res', res);
        //this.value = `NOMBRE COMPLETO:${res[0].nombres} ${res[0].apellido_paterno} ${res[0].apellido_materno}`
        //this.value = `http://localhost:4200/#/verificador/${res[0].qr}`;
        console.log('this.value', this.value);
        this.notaItems = res;
        // fecha
        var fecha;
        const getFecha = res[0].fecha_inicio;
        fecha = moment.utc(getFecha).format('DD/M/YYYY');
        const meses = ["",
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
        ]
        const sep = fecha.split('/');
        const dia = sep[0]
        const mes = sep[1]
        const anio = sep[2]

        console.log(anio);
        
        this.diaMes = `a partir del ${dia} de ${meses[mes]} de ${anio}, por el lapso de ${res[0].meses_contrato} meses y ${res[0].dias_contrato} días`;
        this.fechaInicio = `${dia} de ${meses[mes]} de ${anio}`;
        //sueldo numeral
        this.montoNumero = NumeroALetra.NumeroALetras(parseInt(res[0].sueldo), 0);
        console.log(this.montoNumero);
      })
    })
    setTimeout(() => {
      //this.exportPDF()
    }, 1000)

    setTimeout(() => {
      //this.router.navigate(['/asesoria-listado'])
    }, 2000)
  }

  exportPDF() {
    var contents = $('#impreso')[0];
    const img = document.getElementById("impreso")
    drawDOM(contents, {
      forcePageBreak: ".page-break",
      paperSize: ['18in', '26in'],
      margin: { left: '5cm', top: '1cm', right: '3cm', bottom: '0cm' }
    }).then(function (group) {
      pdf.saveAs(group, "contrato.pdf");
    });
    //this.router.navigateByUrl('formulario-listado')
  }

}
