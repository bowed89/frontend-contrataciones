import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from 'src/app/Services/planificacion.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-form-poa-visualizacion',
  templateUrl: './form-poa-visualizacion.component.html',
  styleUrls: ['./form-poa-visualizacion.component.css']
})
export class FormPoaVisualizacionComponent implements OnInit {
  formsPoa: object;
  fecha: string;
  anio: string;
  direccionUser: string;
  flagImprimir: boolean = true;

  year: string = moment().format('YYYY');

  constructor(
    private activatedRoute: ActivatedRoute,
    private _planificacionService: PlanificacionService
  ) { }

  ngOnInit(): void {
    this._planificacionService.getDireccionUser(parseInt(localStorage.getItem('id'))).subscribe(res => {
      console.log(res);
      for(let i in res) {
        this.direccionUser = res[i].detalle;
      }
    })
    this.activatedRoute.params.subscribe(param => {
      var id = param['id']; 
      this._planificacionService.getPoaId(id).subscribe(res => {
        console.log(res);
        this.formsPoa = res;
        for(let i in res) {
          const getFecha = res[i].fecha_solicitud;
          this.fecha = moment.utc(getFecha).format('DD/MM/YYYY');
          const sep = this.fecha.split('/');
          this.anio = sep[2]

          if(res[i].fuc == "0" || res[i].tdr == "0" || res[i].hoja_vida == "0") {
            this.flagImprimir = false;
          }
        }
      })
    })
  }
}
