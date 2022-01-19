import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsaService } from 'src/app/Services/usa.service';

@Component({
  selector: 'app-cuadro-eq-editar',
  templateUrl: './cuadro-eq-editar.component.html',
  styleUrls: ['./cuadro-eq-editar.component.css']
})
export class CuadroEqEditarComponent implements OnInit {
  cargo: string;
  formacion: string;
  expgen_anio: number;
  expgen_mes: number;
  expesp_anio: number;
  expesp_mes: number;
  cursos: string;
  titulo_expgeneral: string;
  titulo_expespecifica: string;
  nivel_salarial: number;
  sueldo: string;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _usaService: UsaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id']
      this._usaService.getCuadroId(this.id).subscribe(res => {
        console.log('res', res);
        this.cargo = res[0].cargo
        this.formacion = res[0].formacion
        this.expgen_anio = res[0].expgen_anio
        this.expgen_mes = res[0].expgen_mes
        this.expesp_anio = res[0].expesp_anio
        this.expesp_mes = res[0].expesp_mes
        this.cursos = res[0].cursos
        this.titulo_expgeneral = res[0].titulo_expgeneral
        this.titulo_expespecifica = res[0].titulo_expespecifica
        this.nivel_salarial = res[0].nivel_salarial
        this.sueldo = res[0].sueldo
      })
    })
    }

  onSubmit() {
    var object = {
      cargo: this.cargo,
      formacion: this.formacion,
      expgen_anio: this.expgen_anio,
      expgen_mes: this.expgen_mes,
      expesp_anio: this.expesp_anio,
      expesp_mes: this.expesp_mes,
      cursos: this.cursos,
      titulo_expgeneral: this.titulo_expgeneral,
      titulo_expespecifica: this.titulo_expespecifica,
      nivel_salarial: this.nivel_salarial,
      sueldo: this.sueldo,
    }
    this._usaService.putCuadroEq(object, this.id).subscribe(res => {
      console.log('bien :)', res);
    })

  }

}
