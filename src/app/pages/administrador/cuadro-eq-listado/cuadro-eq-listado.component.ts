import { Component, OnInit } from '@angular/core';
import { UsaService } from 'src/app/Services/usa.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-cuadro-eq-listado',
  templateUrl: './cuadro-eq-listado.component.html',
  styleUrls: ['./cuadro-eq-listado.component.css']
})
export class CuadroEqListadoComponent implements OnInit {
  tdrLists: any;
  cols: any[];
  usuarios: any;
  selectedCar: any;
  getCuadros: any;
  getCursos: any;

  constructor(
    private _usaService: UsaService
  ) { }

  ngOnInit(): void {
    // nombres de columnas de las tablas
    this.cols = [
      { field: 'nivel_salarial', header: 'NIVEL SALARIAL' },
      { field: 'cargo', header: 'CARGO' },
      { field: 'sueldo', header: 'SUELDO MENSUAL' },
      { field: 'formacion', header: 'FORMACIÓN' },
      { field: 'cursos', header: 'CURSOS REQUERIDOS' },
      { field: 'titulo_expgeneral', header: 'EXPERIENCIA GENERAL' },
      { field: 'titulo_expespecifica', header: 'EXPERIENCIA ESPECIFICA' },
      { field: '', header: 'OPCIONES' },
    ];
    this._usaService.getCuadroEq().subscribe(res => {
      console.log(res);
      this.usuarios = res;
    })
  }
  evento(e) {
    this._usaService.getCuadroId(e).subscribe(res => {
      this.getCuadros = res;
      console.log(this.getCuadros);
      this.getCursos = (res[0].cursos).split(',')
      console.log(this.getCursos);
    })
  }

  closeAdd() {
    $('#modalVisualizar').modal('hide')
  }

}
