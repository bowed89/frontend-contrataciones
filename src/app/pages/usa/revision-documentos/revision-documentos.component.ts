import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsaService } from 'src/app/Services/usa.service';
import * as moment from 'moment';

@Component({
  selector: 'app-revision-documentos',
  templateUrl: './revision-documentos.component.html',
  styleUrls: ['./revision-documentos.component.css']
})
export class RevisionDocumentosComponent implements OnInit {
  id: number;
  resps: object
  docs_presentar: any;
  fecha: string;
  anio: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _usaService: UsaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this._usaService.getNotaById(this.id).subscribe(res => {
        this.resps = res;
        console.log(res);
        this.docs_presentar = (res[0].documentos_presentar).split(';')
        console.log(this.docs_presentar);
        // fecha
        const getFecha = res[0].fecha_solicitud;
        this.fecha = moment.utc(getFecha).format('DD/MM/YYYY');
        const sep = this.fecha.split('/');
        this.anio = sep[2]
      })
    })


  }

}
