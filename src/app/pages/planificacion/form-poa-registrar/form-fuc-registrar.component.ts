import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { PlanificacionService } from 'src/app/Services/planificacion.service';
import Swal from 'sweetalert2'
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-form-fuc-registrar',
  templateUrl: './form-fuc-registrar.component.html',
  styleUrls: ['./form-fuc-registrar.component.css']
})
export class FormFucRegistrarComponent implements OnInit {
  formularioForm: FormGroup;
  tdr: number;
  fuc: number;
  hoja_v: number;

  constructor(
    private _planificacionService: PlanificacionService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }


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

  }

  onSubmit() {
    var id;
    this.activatedRoute.params.subscribe(param => {
      id = param['id'];
    })

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
    this.formularioForm.value.id_formulario_contratacion = parseInt(id);
    this.formularioForm.value.tdr = this.tdr;
    this.formularioForm.value.fuc = this.fuc;
    this.formularioForm.value.hoja_vida = this.hoja_v;

    console.log(this.formularioForm.value);
    console.log(this.formularioForm.value.id_formulario_contratacion);

     this._planificacionService.postReqPoa(this.formularioForm.value).subscribe(res => {
      var id;
      console.log(res);

      for(let i in res) {
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

}
