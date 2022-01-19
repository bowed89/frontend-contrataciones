import { Component, OnInit } from '@angular/core';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-tdr-prelistado',
  templateUrl: './form-tdr-prelistado.component.html',
  styleUrls: ['./form-tdr-prelistado.component.css']
})
export class FormTdrPrelistadoComponent implements OnInit {
  cols: any[];
  terminoRef: any;
  tdrLists: any;
  resTdrFuc: Array<any> = [];

  arrayList: Array<any> = [];

  constructor(
    private _unidadSolicitanteService: UnidadSolicitanteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // nombres de columnas de las tablas
    this.cols = [
      { field: 'puesto_cargo', header: 'DENOMINACIÓN DEL PUESTO' },
      { field: 'remuneracion', header: 'REMUNERACIÓN' },
      { field: 'num_vacancia', header: 'NUMERO DE VACANCIAS' },
      { field: 'fecha_publicacion', header: 'FECHA PUBLICACION' },
      { field: 'fecha_fin_conv', header: 'FECHA FIN CONVOCATORIA' },
      { field: 'hora_fin_conv', header: 'HORA FIN CONVOCATORIA' },
      { field: 'sede_trabajo', header: 'SEDE TRABAJO' },
      { header: 'GENERAR TDR' }
    ];
    let num_vac = [];

    this._unidadSolicitanteService.getPreTdr().subscribe(res => {
      console.log(res);
      this.terminoRef = res
      this.tdrLists = res;
      for (let i in res) {
        num_vac.push((res[i].num_vacancia).split(','))
      }
      for (let i in res) {
        this._unidadSolicitanteService.findIdConvInTdr(res[i].id_convocatoria).subscribe(res => {
          for (let i in res) {
            this.resTdrFuc.push(res[i].id_convocatoria)
          }
        })
      }
    })
  }

  founded(item) {
    let num = parseInt(item)
    return this.resTdrFuc.find(x => x === num)
  }

  evento(event) {
    console.log('event', event);
    var boolean = (this.resTdrFuc.indexOf(parseInt(event)) > -1);
    if (boolean) {
      this.router.navigate(['/formulario-listado'])
    } else {
      this.router.navigate(['/form-tdr-copiar-pre', event])
    }
  }

}
