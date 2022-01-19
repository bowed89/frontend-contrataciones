import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsesoriaService } from 'src/app/Services/asesoria.service';
import { UsaService } from 'src/app/Services/usa.service';

import Swal from 'sweetalert2'
import * as moment from 'moment';
import { NumeroALetra } from '../../tools/NumeroALetra';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-contratos-listado',
  templateUrl: './contratos-listado.component.html',
  styleUrls: ['./contratos-listado.component.css']
})
export class ContratosListadoComponent implements OnInit {
  cols: any[];
  terminoRef: any;

  ci: string;
  notaAceptacion: string;
  sippase: string;
  sin: string;
  nua: string;
  rupe: string;
  observaciones: string;
  recomendaciones: string;
  id_fuc: string;
  resFuc: Array<any> = [];

  constructor(
    private router: Router,
    private _asesoriaService: AsesoriaService,
    private _usaService: UsaService
  ) { }

  ngOnInit(): void {
    this._asesoriaService.getAllNota().subscribe(res => {
      console.log(res);
      this.terminoRef = res
      for (let i in res) {
        console.log(res[i].id_formulario_contratacion);
        this._asesoriaService.findIdFucInInforme(res[i].id_formulario_contratacion).subscribe(resp => {
          for (let i in resp) {
            this.resFuc.push(resp[i].id_formulario_contratacion);

          }
        })
      }
    })
    // nombres de columnas de las tablas
    this.cols = [
      { field: 'sigla', header: 'N° CORRELATIVO' },
      { field: 'cargo', header: 'CARGO' },
      { field: 'nombres', header: 'PERSONA SELECCIONADA' },
      { field: 'numero_documento', header: 'DOCUMENTO DE IDENTIDAD' },
      { header: 'POSTULANTE SELECCIONADO' },
      { header: 'CONTRATOS' },
      { header: 'INFORME LEGAL' },
    ];
  }

  openAdd(id) {
    this.id_fuc = id;
    $('#modalAdd').modal('show')
  }

  closeAdd() {
    $('#modalAdd').modal('hide')
  }

  submit() {
    var object = {
      id_formulario_contratacion: this.id_fuc,
      ci: this.ci,
      nota_aceptacion: this.notaAceptacion,
      sippase: this.sippase,
      sin: this.sin,
      nua: this.nua,
      rupe: this.rupe,
      observaciones: this.observaciones,
      recomendaciones: this.recomendaciones,
      usuario: localStorage.getItem('id_usuario'),
      created_at: moment(new Date()).format("YYYY-MM-DD")
    }

    console.log('object', object);
    this._asesoriaService.postInformeLegal(object).subscribe(res => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Informe registrado correctamente.',
        showConfirmButton: false,
        timer: 2000
      })
      for (let i in res) {
        this.router.navigate(['/informe-visualizar', res[i].id_informe])
      }
      this.closeAdd();

    }, (err) => {
      console.log(err.error.errors);
      for (let i in err.error.errors) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `${err.error.errors[i].msg}`,
        })
      }
    })
    //this.router.navigate(['/asesoria-generar-informe'])
  }

  founded(item) {
    return this.resFuc.find(x => x === item)
  }
  evento(e) {
    var boolean = (this.resFuc.indexOf(parseInt(e)) > -1);
    if (boolean) {
      this._asesoriaService.getFucTableInforme(e).subscribe(res => {
        console.log(res);
        this.router.navigate(['/informe-visualizar', res[0].id_informe])
      })
    } else {
      this.openAdd(e);
    }
  }
   postContrato(idFuc) {
    var object = {
      id_formulario_contratacion: idFuc,
      qr: Math.floor(10000000000000000 + Math.random() * 90000000000000000),
      usuario: localStorage.getItem('id_usuario'),
      created_at: moment(new Date()).format("YYYY-MM-DD")
    }
    console.log(object);
    console.log(idFuc);
    this._asesoriaService.findIdFucInContrato(idFuc).subscribe(res => {
      console.log(res);
      // sino encuentra el id del fuc seleccionado en la tabla contrato hace el insert en dicha tabla
      if (Object.keys(res).length == 0) {
        this._asesoriaService.postContrato(object).subscribe(res => {
          console.log(res);
        })
      }
    })
    this.imprimir(idFuc);
  }

   imprimir(id) {
    console.log(id);
    this._asesoriaService.getNotaById(id).subscribe(res => {
      console.log(res);
      // fecha
      let fecha;
      let getFecha = res[0].fecha_inicio;
      console.log('getFecha', getFecha);
      fecha = moment.utc(getFecha).format('DD/M/YYYY');
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
      var diaMes = `a partir del ${dia} de ${meses[mes]} de ${anio}, por el lapso de ${res[0].meses_contrato} meses y ${res[0].dias_contrato} días`;
      var fechaInicio = `${dia} de ${meses[mes]} de ${anio}`;

      var montoNumero = NumeroALetra.NumeroALetras(parseInt(res[0].sueldo), 0);

      console.log("resContrato-->", res);
      var object = {
        datos: {
          qr: res[0].qr,
          nombres: res[0].nombres,
          apellido_paterno: res[0].apellido_paterno,
          apellido_materno: res[0].apellido_materno,
          numero_documento: res[0].numero_documento,
          extension_documento: res[0].extension_documento,
          detalle: res[0].detalle,
          cargo: res[0].cargo,
          objeto_contratacion: res[0].objeto_contratacion,
          ciudad: res[0].ciudad,
          cite: res[0].cite,
          diaMes: diaMes,
          sueldo: res[0].sueldo,
          montoNumero: montoNumero,
          fechaInicio: fechaInicio
        }
      }
      const resContrato = this._usaService.getpdfContrato(object).subscribe(res => {
        console.log('resContrato---> ', res);
        this.showPdfbase64(res);
      })
    })
  }

  showPdfbase64(base64: any) {
    const linkSource = 'data:application/pdf;base64,' + base64;
    const downloadLink = document.createElement("a");
    const fileName = "contrato.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
