import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from 'src/app/Services/planificacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import * as moment from 'moment'


import Swal from 'sweetalert2'
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-form-fuc-listado',
  templateUrl: './form-fuc-listado.component.html',
  styleUrls: ['./form-fuc-listado.component.css']
})
export class FormFucListadoComponent implements OnInit {
  pageActual: number = 1;
  resIdPoa: Array<any> = [];
  idPoa: string;

  cols: any[];
  fucListado: any;
  fucListado2: any;

  nombres: string;
  getPostulantes: Array<any> = [];
  post: Array<any> = [];

  /* variables del modal agregar */
  formularioForm: FormGroup;
  tdr: number;
  fuc: number;
  hoja_v: number;
  fuc_id: number;

  year: string = moment().format('YYYY');


  constructor(
    private _planificacionService: PlanificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formularioForm = this.formBuilder.group({
      id_formulario_contratacion: ["", Validators.required],
      fecha_solicitud: ["", Validators.required],
      accion_corto_plazo: ["", Validators.required],
      resultado_esperado: ["", Validators.required],
      operacion: ["", Validators.required],
      tdr: ["", Validators.required],
      fuc: ["", Validators.required],
      hoja_vida: ["", Validators.required],
      created_at: ["", Validators.required],
      updated_at: ["", Validators.required]
    });
    /* Selecciona solo un checkbox */
    $(".formContr").on("change", function () {
      $(".formContr").not(this).prop("checked", false);
    });
    $(".formContr2").on("change", function () {
      $(".formContr2").not(this).prop("checked", false);
    });
    $(".formContr3").on("change", function () {
      $(".formContr3").not(this).prop("checked", false);
    });

    // nombres de columnas de las tablas
    this.cols = [
      { field: 'sigla', header: 'CORRELATIVO' },
      { field: 'cargo', header: 'DENOMINACIÓN DEL PUESTO' },
      { field: 'nombres', header: 'NOMBRE DEL POSTULANTE' },
      { header: 'GENERAR POA' },
      { header: 'ACCIONES' }
    ];
    this._planificacionService.getFuc().subscribe(res1 => {
      this.fucListado2 = res1
      console.log(this.fucListado2);

      for (let i in res1) {
        this._planificacionService.findIdFucinPoa(res1[i].id_formulario_contratacion).subscribe(resp => {
          console.log(resp);
          for (let i in resp) {
            this.resIdPoa.push(resp[i].id_formulario_contratacion)
          }
        })
      }
    })
  }

  onSubmit() {
    /* Fecha yyyy-mm-dd */
    const current = new Date()
    const formatDate = (date) => {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [year, month, day].join('-');
    }
    this.formularioForm.value.created_at = formatDate(current)
    this.formularioForm.value.updated_at = formatDate(current)
    this.formularioForm.value.id_formulario_contratacion = this.fuc_id;
    this.formularioForm.value.tdr = this.tdr;
    this.formularioForm.value.fuc = this.fuc;
    this.formularioForm.value.hoja_vida = this.hoja_v;

    console.log(this.formularioForm.value);
    console.log(this.formularioForm.value.id_formulario_contratacion);

    this._planificacionService.postReqPoa(this.formularioForm.value).subscribe(res => {
      var id;
      console.log(res);

      for (let i in res) {
        id = res[i].id_certificacion_poa;
      }
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Formulario FUC almacenado correctamente.',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        this.closeAdd();
        this.router.navigate([`/poa-visualizar/${id}`]);
      }, 3000)
    }, (err) => {
      console.log(err);
      for (let i in err.error.errors) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `${err.error.errors[i].msg}`,
        })
      }
    })
  }
  /* Almacena valores del checkbox */
  onCheckFormCont(event, valCond) {
    if (valCond == "tdr") {
      this.tdr = parseInt(event.target.value);
    }
    if (valCond == "fuc") {
      this.fuc = parseInt(event.target.value);
    }
    if (valCond == "hoja_vida") {
      this.hoja_v = parseInt(event.target.value);
    }
  }

  founded(item) {
    return this.resIdPoa.find(x => x === item)
  }

  evento(event) {
    this.fuc_id = parseInt(event.target.value);
    console.log('click', this.fuc_id);
    var boolean = (this.resIdPoa.indexOf(parseInt(event.target.value)) > -1);
    if (boolean) {
      this._planificacionService.findIdFucinPoa(event.target.value).subscribe(res => {
        this.idPoa = res[0].id_certificacion_poa;
        this.router.navigate(['/poa-visualizar', this.idPoa])
      })
    } else {
      $('#modalAdd').modal('show')
    }
  }
  closeAdd() {
    $('#modalAdd').modal('hide')
  }


}
