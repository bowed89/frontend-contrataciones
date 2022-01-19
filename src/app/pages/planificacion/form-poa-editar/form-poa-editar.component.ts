import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanificacionService } from 'src/app/Services/planificacion.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { formatDate } from '@angular/common';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-form-poa-editar',
  templateUrl: './form-poa-editar.component.html',
  styleUrls: ['./form-poa-editar.component.css']
})
export class FormPoaEditarComponent implements OnInit {
  tdr: number;
  fuc: number;
  hoja_vida: number;
  id: number;
  fecha_solicitud: string;
  accion_corto_plazo: string;
  resultado_esperado: string;
  operacion: string
  resPoa: object;

  flagTDR: boolean = false;
  flagTDR2: boolean = false;
  flagFUC: boolean = false;
  flagFUC2: boolean = false;
  flagHV: boolean = false;
  flagHV2: boolean = false;

  constructor(
    private _planificacionService: PlanificacionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this._planificacionService.getPoaId(this.id).subscribe(res => {
        console.log(res);
        const input = res[0].fecha_solicitud
        const fechaSolicitud = moment.utc(input).format('YYYY-MM-DD');
        this.fecha_solicitud = fechaSolicitud;
        this.accion_corto_plazo = res[0].accion_corto_plazo;
        this.resultado_esperado = res[0].resultado_esperado;
        this.operacion = res[0].operacion;
        this.tdr = parseInt(res[0].tdr);
        this.fuc = parseInt(res[0].fuc);
        this.hoja_vida = parseInt(res[0].hoja_vida)

        /* FLAGS PARA CHECKBOXES */
        if (res[0].tdr == "1") {
          this.flagTDR = true;
        } else {
          this.flagTDR2 = true;
        }
        if (res[0].fuc == "1") {
          this.flagFUC = true;
        } else {
          this.flagFUC2 = true;
        }
        if (res[0].hoja_vida == "1") {
          this.flagHV = true;
        } else {
          this.flagHV2 = true;
        }
      })
    })

    /* Selecciona solo un checkbox */
    $(".formContr").on("change", function () {
      $(".formContr").not(this).prop("checked", false);
    });
    $(".formContr2").on("change", function () {
      $(".formContr2").not(this).prop("checked", false);
    });
    $(".formContr3").on("change", function () {
      $(".formContr3").not(this).prop("checked", false);
    })
  }
  /* Almacena valores del checkbox */
  onCheckFormCont(event, valCond) {
    if (valCond == "tdr") {
      this.tdr = parseInt(event.target.value);
      //console.log(this.tdr);
    }
    if (valCond == "fuc") {
      this.fuc = parseInt(event.target.value);
    }
    if (valCond == "hoja_vida") {
      this.hoja_vida = parseInt(event.target.value);
    }
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


    this.resPoa = {
      fecha_solicitud: this.fecha_solicitud,
      accion_corto_plazo: this.accion_corto_plazo,
      resultado_esperado: this.resultado_esperado,
      operacion: this.operacion,
      tdr: this.tdr,
      fuc: this.fuc,
      hoja_vida: this.hoja_vida,
      updated_at: formatDate(current)
    }
    Swal.fire({
      title: '¿Está seguro de realizar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, realizar cambios!'
    }).then((result) => {
      this._planificacionService.putPoa(this.resPoa, this.id).subscribe(res => {
        console.log(res);
        this.router.navigate(['/poa-visualizar', this.id])
      })
      if (result.isConfirmed) {

        Swal.fire(
          'Modificado!',
          'El certificado POA fué modificado.',
          'success'
        )
      }
    })
    console.log(this.resPoa)

  }
}
