import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsesoriaService } from 'src/app/Services/asesoria.service';

import * as moment from 'moment';

@Component({
  selector: 'app-verificador',
  templateUrl: './verificador.component.html',
  styleUrls: ['./verificador.component.css']
})
export class VerificadorComponent implements OnInit {
  obj: object;
  fecha: string;
  flagVerificador = false;

  constructor(
    private _asesoriaService: AsesoriaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      var id = param['id'];
      this._asesoriaService.getNotaByQr(`'${id}'`).subscribe(res => {
        console.log(res);
        if(Object.keys(res).length > 0) {
          this.flagVerificador = true;
          this.fecha = moment.utc(res[0].fecha_inicio).format('DD/MM/YYYY');
          this.obj = res;
        }else {
          this.flagVerificador = false;
          return;
        }
      }, (err)=> {
        console.log(err);
      })
      
    })
  }

}
