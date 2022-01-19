import { Component, OnInit } from '@angular/core';
import { UsaService } from 'src/app/Services/usa.service';
import { Router } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import { PlanificacionService } from 'src/app/Services/planificacion.service';

import * as moment from 'moment';
import Swal from 'sweetalert2'

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-poa-listado',
  templateUrl: './poa-listado.component.html',
  styleUrls: ['./poa-listado.component.css']
})
export class PoaListadoComponent implements OnInit {
  poaListados: object;
  pageActual: number = 1;
  anio: string;
  fecha: string;

  respFuc: any;
  faRes: string;
  mta: string;
  getIdGrupo: number;
  flagIdGrupo: boolean = false;
  fechaFuc: string;

  formsPoa: object;
  fechaPoa: string;

  docsArray = [
    'Certificado RUPE (cuando corresponda)',
    'Nota de Aceptación a la Consultoría',
    'Declaración Jurada de Integridad (Form. INE/DAS/PP-PE-CL-04)',
    'Fotocopia de Cédula de Identidad',
    'Certificado de No Violencia',
    'Certificado de Antecedentes Penales',
    'Fotocopia de NIT y/o Certificado de Inscripción en el Servicio Nacional de Impuestos Nacionales o Solicitud de Retención impositiva, IVA e IT.',
    'Fotocopia de NUA/CUA de la AFP'
  ];
  docsAttribute: any;
  docsObject: Array<any> = [];
  idFuc: number;
  resFucNota: Array<any> = [];;

  resp: any;
  proyectoTdr: any;
  fechaTdr: string;
  resultadosTdr: any;
  concatarraysTdr: any;
  id: number
  hrInput: string;
  cil: string;
  citeInput: string;
  docPresentar: Array<any> = [];
  cols: any[];
  terminoRef: any;

  year: string = moment().format('YYYY');

  constructor(
    private _usaService: UsaService,
    private _unidadSolicitanteService: UnidadSolicitanteService,
    private _planificacionService: PlanificacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // nombres de columnas de las tablas
    this.cols = [
      { field: 'sigla', header: 'N° SOLICITUD' },
      { field: 'objeto_contratacion', header: 'OBJETO DE CONTRATACIÓN' },
      { field: 'nombres', header: 'NOMBRE DEL POSTULANTE' },
      { header: 'NOTA DE ADJUDICACIÓN	' },
      { header: 'VER' }
    ];
    this._usaService.getPoa().subscribe(res => {
      this.terminoRef = res;
      console.log(res);
      for (let i in res) {
        this._usaService.findIdFucInNotaAd(res[i].id_formulario_contratacion).subscribe(resp => {
          console.log('ddd', resp);
          for (let i in resp) {
            this.resFucNota.push(resp[i].id_formulario_contratacion)
          }
        })
      }

      this.poaListados = res;
      for (let i in res) {
        const getFecha = res[i].fecha_solicitud;
        this.fecha = moment.utc(getFecha).format('DD/MM/YYYY');
        const sep = this.fecha.split('/');
        this.anio = sep[2]
      }
    })
  }
  deleteFieldValueDocs(index) {
    this.docsObject.splice(index, 1);
  }
  addFieldValueDocs() {
    this.docsObject.push({
      doc: this.docsAttribute
    })
  }
  generarNota() {
    const dateNow = moment(new Date()).format("YYYY-MM-DD")
    this._usaService.hr = this.hrInput;
    for (let i in this.docsObject) {
      this.docPresentar.push(this.docsObject[i].doc)
    }

    var object = {
      id_formulario_contratacion: this.idFuc,
      usuario: localStorage.getItem('id_usuario'),
      documentos_presentar: this.docPresentar.join().replace(/,/g, ';'),
      hr: this.hrInput,
      cite: this.citeInput,
      cil: this.cil,
      created_at: dateNow
    }
    console.log('object', object);
    this._usaService.postNotaAdjudicacion(object).subscribe(res => {
      let newIdNota = res['datos']['id_nota_adjudicacion'];
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Nota de Adjudicación generada correctamente.',
        showConfirmButton: false,
        timer: 3000
      })
      $('#modalAdd').modal('hide');
      this.router.navigate([`/revision-postulante`, newIdNota]);
    }, (err) => {
      for (let i in err.error.errors) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `${err.error.errors[i].msg}`,
        })
      }
    })
  }

  openAdd(id_fuc) {
    this.idFuc = id_fuc;
    $('#modalAdd').modal('show')
    for (let i in this.docsArray) {
      this.docsObject.push({
        doc: this.docsArray[i]
      })
      console.log(this.docsObject);
    }
  }

  closeAdd() {
    this.docsObject = []
    $('#modalAdd').modal('hide')
  }

  openTdr(e) {
    $('#modalTdr').modal('show')
    this._unidadSolicitanteService.getTdrId(e.target.value).subscribe(res => {
      console.log(res);
      this.resp = res;
      for (let i in this.resp) {
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
        this.fechaTdr = `${dia} de ${meses[mes]}`;
        // separar string de res, act, y funciones en arrays
        // this.resultadosTdr = (this.resp[i].resultados_esperados).split(',');
        const funciones = (this.resp[i].funciones).split(',');
        const actividades = (this.resp[i].actividades).split(',');
        this.concatarraysTdr = funciones.concat(actividades);
      }
      // obtener el nom del proyecto por id
      this._unidadSolicitanteService.getProyectoId(idProy).subscribe(res => {
        for (let i in res) {
          this.proyectoTdr = res[i].detalle;
        }
      })
    })
  }
  closeTdr() {
    $('#modalTdr').modal('hide')
  }
  openFuc(e) {
    $('#modalFuc').modal('show')
    console.log(e.target.value);
    this._unidadSolicitanteService.getFucId(e.target.value).subscribe(res => {
      console.log(res);
      this.respFuc = res;
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
      this.fechaFuc = `${dia} de ${meses[mes]} de ${anio}`;

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
  }
  closeFuc() {
    $('#modalFuc').modal('hide')
  }

  founded(item) {
    return this.resFucNota.find(x => x === item)
  }
  evento(e) {
    var boolean = (this.resFucNota.indexOf(parseInt(e)) > -1);
    if (!boolean) {
      this.openAdd(e)
    } else {
      //this.router.navigate(['/nota-adjudicacion', e])
      // obtenemos el id de la nota de de adjudicacion por medio del id_formulario_contratacion
      this._usaService.getIdNotaByIdFuc(e).subscribe(res => {
        console.log(res[0]['id_nota_adjudicacion']);
        this.router.navigate(['/revision-postulante', res[0]['id_nota_adjudicacion']])
      })

    }
  }


  openPoa(e) {
    $('#modalPoa').modal('show')
    this._planificacionService.getPoaId(e.target.value).subscribe(res => {
      console.log(res);
      this.formsPoa = res;
      const getFecha = res[0].fecha_solicitud;
      this.fechaPoa = moment.utc(getFecha).format('DD/MM/YYYY');
    })
  }
  closePoa() {
    $('#modalPoa').modal('hide')
  }



}
