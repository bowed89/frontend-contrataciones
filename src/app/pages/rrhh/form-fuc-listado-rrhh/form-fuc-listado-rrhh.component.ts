import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from 'src/app/Services/planificacion.service';
import { RrhhService } from 'src/app/Services/rrhh.service';
import { UsaService } from 'src/app/Services/usa.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form-fuc-listado-rrhh',
  templateUrl: './form-fuc-listado-rrhh.component.html',
  styleUrls: ['./form-fuc-listado-rrhh.component.css']
})
export class FormFucListadoRrhhComponent implements OnInit {
  pageActual: number = 1;
  fucLists: any;
  example: object = []
  anio: string = moment().format('YYYY');


  constructor(
    private _rrhhService: RrhhService,
    private _planificacionService: PlanificacionService,
    private _usaService: UsaService

  ) { }

  ngOnInit(): void {

/*     this._rrhhService.getFucRrhh().subscribe(res => {
      console.log(res);
      this.fucLists = res;
    }) */
    this._planificacionService.getFuc().subscribe(res => {
      console.log(res);
      this.fucLists = res;

    })
  }

    

}
