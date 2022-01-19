import { Component, OnInit } from '@angular/core';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios-visualizar',
  templateUrl: './usuarios-visualizar.component.html',
  styleUrls: ['./usuarios-visualizar.component.css']
})
export class UsuariosVisualizarComponent implements OnInit {
  resp: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _unidadSolicitanteService: UnidadSolicitanteService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(param => {
      this._unidadSolicitanteService.getUserById(param['id']).subscribe(res => {
        console.log(res);
        this.resp = res;
      })

    })

  }

}
