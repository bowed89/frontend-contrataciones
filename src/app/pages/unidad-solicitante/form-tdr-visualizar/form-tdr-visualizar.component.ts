import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';

import * as moment from 'moment';
import { NumeroALetra } from '../../tools/NumeroALetra';

import { UsaService } from 'src/app/Services/usa.service';

@Component({
  selector: 'app-form-tdr-visualizar',
  templateUrl: './form-tdr-visualizar.component.html',
  styleUrls: ['./form-tdr-visualizar.component.css']
})
export class FormTdrVisualizarComponent implements OnInit {
  resp: any;
  proyecto: any;
  fecha: string;
  resultados: any;
  concatarrays: any;
  funciones: any;
  documentos: any;
  cursosReq: string;
  id: number
  justificacion: any
  actividades: any
  actFlag: boolean = false;
  object: object;
  sigla: string;

  diaMes: string;
  montoNumero: string;
  montoNumeroTotal: string;
  area: string;
  sede: string;
  objetoC: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _unidadSolicitanteService: UnidadSolicitanteService,
    private _usaService: UsaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this._unidadSolicitanteService.getTdrId(this.id).subscribe(res => {
        this.sigla = res[0].sigla;

        this.montoNumero = NumeroALetra.NumeroALetras(parseInt(res[0].sueldo), 0);
        this.montoNumeroTotal = NumeroALetra.NumeroALetras(parseInt(res[0].sueldo_total), 0);
        console.log(res);
        this.justificacion = (res[0].justificacion).split(';');
        this.actividades = (res[0].actividades).split(';');
        if (this.actividades != "") {
          this.actFlag = true;
        } else {
          this.actFlag = false;
        }
        this.resp = res;
        for (let i in this.resp) {
          this.cursosReq = (this.resp[i].perfil_cursos_req).split(';')
          var idProy = this.resp[i].id_proyecto
          // Convertir fecha en letras...
          const input = this.resp[i].fecha_inicio
          const date = moment.utc(input).format('YYYY-M-DD');
          const meses = ["",
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
          ]
          const sep = date.split('-');
          const dia = sep[2]
          const mes = sep[1]
          this.fecha = `${dia} de ${meses[mes]}`;
          // separar string de res, act, y funciones en arrays
          //this.resultados = (this.resp[i].resultados_esperados).split(',');
          this.funciones = (this.resp[i].funciones).split(';');
          this.documentos = (this.resp[i].documentos_presentar).split(';');
          const actividades = (this.resp[i].actividades).split(';');
          //this.concatarrays = funciones.concat(actividades);
        }
        // obtener el nom del proyecto por id
        this._unidadSolicitanteService.getProyectoId(idProy).subscribe(res => {
          for (let i in res) {
            this.proyecto = res[i].detalle;
          }
        })
      }, (error) => {
        console.log(error);
      })
    })
  }

  copiarDatos() {
    this._unidadSolicitanteService.copiarValoresTdr = this.resp;
    this.router.navigate(['/form-tdr-copiar', this.id])
  }

  imprimir(id) {
    this._unidadSolicitanteService.getTdrId(id).subscribe(res => {
      /* Si en el  perfil_cursos_req tiene undefined se borra y se envia vacio para imprimir*/
      let flagUndefined;
      if((res[0].perfil_cursos_req).includes('undefined')) {
        flagUndefined = '';
      }else {
        flagUndefined = res[0].perfil_cursos_req;
      }
      /* Fecha */
      var fecha = moment.utc(res[0].fecha_inicio).format('DD/M/YYYY');
      const meses = ["",
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
      ]
      const sep = fecha.split('/');
      const dia = sep[0]
      const mes = sep[1]
      const anio = sep[2]
      const dias = this.resp[0].dias_contrato
      /* fecha con 0 dias */
      var diaMes = `Por un periodo de ${res[0].meses_contrato} meses a partir del ${dia} de ${meses[mes]} de ${anio}`;
      var diaMes2 = `${dia} de ${meses[mes]}, en la gestión ${res[0].gestion}`
      /* fecha con n dias */
      var mesesConDias = `Por un periodo de ${res[0].meses_contrato} meses y ${this.resp[0].dias_contrato} días a partir del ${dia} de ${meses[mes]} de ${anio}`;

      console.log(res)
      var jus = (res[0].justificacion).split(';');
      var fun = (res[0].funciones).split(';');
      var act = (res[0].actividades).split(';');
      var docs = (res[0].documentos_presentar).split(';');
  
      this.area = res[0].area;
      this.sede = res[0].sede_trabajo;
      this.objetoC = res[0].objeto_contratacion;

      var obj = {
        datos: {
          dias: dias,
          documentos_presentar: docs,
          objeto_contratacion: res[0].objeto_contratacion,
          sede_trabajo: res[0].sede_trabajo,
          cargo: res[0].cargo,
          sigla: res[0].sigla,
          organismo_fin: res[0].organismo_fin,
          antecedentes: res[0].antecedentes,
          sueldo: res[0].sueldo,
          objetivo_consultoria: res[0].objetivo_consultoria,
          perfil_formacion_min: res[0].perfil_formacion_min,
          perfil_cursos_req: flagUndefined,
          perfil_exp_gral: res[0].perfil_exp_gral,
          perfil_exp_esp: res[0].perfil_exp_esp,
          meses_contrato: res[0].meses_contrato,
          detalle: res[0].detalle,
          modalidad_contratacion: res[0].modalidad_contratacion,
          diaMes: diaMes,
          diaMes2: diaMes2,
          mesesConDias: mesesConDias,
          funciones: fun,
          justificacion: jus,
          actividades: act,
          montoNumero: this.montoNumero,
          area: res[0].area,
          lugar_horario: res[0].lugar_horario,
          supervision_dep: res[0].supervision_dep,
          honorarios_me: res[0].honorarios_me
        }
      }
      console.log(obj);
      const chofer = res[0].objeto_contratacion;
      const word = 'CHOFER';
      const resulChofer = chofer.includes(word)

      if (this.sigla == 'EH 2021' && res[0].objeto_contratacion == 'ENCUESTADOR') {
        console.log('imrpime tdr ENCUENTADOR EH2021');
        this._usaService.getpdfEH2021(obj).subscribe(res => {
          console.log('imprimir --->', res);
          this.showPdfbase64(res);
        }, (err) => {
          console.log("err", err);
        })

      } else if (this.sigla == 'EH 2021' && res[0].objeto_contratacion == 'SUPERVISOR DE CAMPO') {
        console.log('imrpime tdr SUPERVISOR DE CAMPO EH2021');
        this._usaService.pdfSupervisorEH2021(obj).subscribe(res => {
          console.log('imprimir --->', res);
          this.showPdfbase64(res);
        }, (err) => {
          console.log("err", err);
        })

      } 
      //chofer
      else if (this.sigla == 'EH 2021' &&  resulChofer ) {
        console.log('imrpime tdr CHOFER EH2021');
        this._usaService.pdfAuxEH2021(obj).subscribe(res => {
          console.log('imprimir --->', res);
          this.showPdfbase64(res);
        }, (err) => {
          console.log("err", err);
        })

      } else {
        console.log('imrpime otro tdr');
        this._usaService.getpdf(obj).subscribe(res => {
          console.log('imprimir --->', res);
          this.showPdfbase64(res);
        }, (err) => {
          console.log("err", err);
        })
      }
    })
  }

  showPdfbase64(base64: any) {
    const linkSource = 'data:application/pdf;base64,' + base64;
    const downloadLink = document.createElement("a");
    let fileName;

    if(this.objetoC == 'SUPERVISOR DE CAMPO') {
      fileName = `SUPERVISOR DE CAMPO AREA ${this.area} ${this.sede}.pdf`; // ENCUESTADOR ÁREA 952-11575040805-D PANDO
    } else if(this.objetoC == 'ENCUESTADOR') {
      fileName = `ENCUESTADOR AREA ${this.area} ${this.sede}.pdf`; // ENCUESTADOR ÁREA 952-11575040805-D PANDO
    }else {
      fileName = `${this.objetoC} ${this.sede} .pdf`; // otros

    }
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
