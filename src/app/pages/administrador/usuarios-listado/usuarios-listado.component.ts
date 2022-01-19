import { Component, OnInit } from '@angular/core';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.css']
})
export class UsuariosListadoComponent implements OnInit {
  tdrLists: any;
  pageActual: number = 1;
  cols: any[];
  usuarios: any;
  selectedCar: any;

  constructor(
    private _unidadSolicitanteService: UnidadSolicitanteService
  ) { }

  ngOnInit(): void {
    // nombres de columnas de las tablas
    this.cols = [
      { field: 'login', header: 'NOMBRE DE USUARIO' },
      { field: 'nombres' , header: 'NOMBRE COMPLETO' },
      { field: 'descripcion', header: 'GRUPO' },
      { field: '', header: 'ACCIONES' }
    ];
    this._unidadSolicitanteService.getListado().subscribe(res => {
      console.log(res);
      this.usuarios = res
    })
  }

  selectProduct(product){
    console.log(product);
  }

}
