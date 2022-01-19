import { Component, OnInit } from '@angular/core';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-form-fuc-visualizar',
  templateUrl: './form-fuc-visualizar.component.html',
  styleUrls: ['./form-fuc-visualizar.component.css']
})
export class FormFucVisualizarComponent implements OnInit {
  id: number;
  verificar: string;
  flagVerificar: boolean = false;

  resp: any;
  faRes: string;
  mta: string;
  getIdGrupo: number;
  flagIdGrupo: boolean = false;
  fecha: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;


  year: string = moment().format('YYYY');
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private _unidadSolicitanteService: UnidadSolicitanteService
  ) { }

  ngOnInit(): void {
    this.getIdGrupo = parseInt(localStorage.getItem('id_grupo'))
    console.log(this.getIdGrupo);
    //Desactiva checboxes si id_grupo no es '4' de rrhh
    if (this.getIdGrupo != 4) {
      this.flagIdGrupo = true;
    } else {
      this.flagIdGrupo = false;
    }
    console.log(this.flagIdGrupo);
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this.verificar = param['verificar'];
      if (this.verificar == 'planificacion') {
        this.flagVerificar = true;
      } else {
        this.flagVerificar = false;
      }

      this._unidadSolicitanteService.getFucId(this.id).subscribe(res => {
        const idPostulante = res[0].id_postulantes;
        console.log(res);
        this._unidadSolicitanteService.getPostulantes2(idPostulante).subscribe(res => {
          console.log(res);
          this.nombres = res[0].nombres
          this.apellido_paterno = res[0].apellido_paterno
          this.apellido_materno = res[0].apellido_materno
        })
        this.resp = res;
        console.log(this.resp)
        const fecha = moment.utc(res[0].fecha_inicio).format('DD/M/YYYY');
        const sep = fecha.split('/');
        const dia = sep[0]
        const mes = sep[1]
        const anio = sep[2]
        const meses = ["",
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
        ]
        this.fecha = `${dia} de ${meses[mes]} de ${anio}`;

        for (let i in res) {
          // asignar valores a numeros de requisitoas del postulante...
          switch (res[i].forma_adjudicacion) {
            case 1:
              this.faRes = 'Por el Total'
              break;
            case 2:
              this.faRes = 'Por Item'
              break;
            case 3:
              this.faRes = 'Por Lotes'
              break;
          }
          switch (res[i].metodo_seleccion_adjudicacion) {
            case 1:
              this.mta = 'Calidad, propuesta Técnica y costo'
              break;
            case 2:
              this.mta = 'Calidad'
              break;
            case 3:
              this.mta = 'Presupuesto Fijo'
              break;
            case 4:
              this.mta = 'Menor Costo'
              break;
            case 5:
              this.mta = 'Precio Evaluado más Bajo '
              break;
          }

        }
      })
    })
  }

}
