import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { RrhhService } from 'src/app/Services/rrhh.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-form-fuc-editar-rrhh',
  templateUrl: './form-fuc-editar-rrhh.component.html',
  styleUrls: ['./form-fuc-editar-rrhh.component.css']
})
export class FormFucEditarRrhhComponent implements OnInit {

  postulante: string;
  forma_adju: number;
  metodo_sel_ad: number;

  formularioForm: FormGroup;
  formulario_create: object;
  postulantes: any;
  forma_adj: any;
  met_sel_adj: any;
  art43: any;
  form_req_obl: any;

  id: any;
  idDireccion: number
  filtrar: any;
  flag = true;
  getIdGrupo: number;
  pac: any;

  constructor(
    private formBuilder: FormBuilder,
    private _rrhhService: RrhhService,
    private _unidadSolicitanteService: UnidadSolicitanteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formularioForm = this.formBuilder.group({
      id_termino_referencia: ["", Validators.required],
      id_postulantes: ["", Validators.required],
      forma_adjudicacion: ["", Validators.required],
      metodo_seleccion_adjudicacion: ["", Validators.required]
    });


    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this._rrhhService.getPostulantedeFuc(this.id).subscribe(res => {
        console.log(res);
        this.filtrar = `${res[0].id_persona} ${res[0].nombres} ${res[0].apellido_paterno} ${res[0].apellido_materno}`;
      })
      this._unidadSolicitanteService.getFucId(this.id).subscribe(resp => {
        console.log('getFucId===>', resp);
        this.pac = resp[0].pac;
        this._unidadSolicitanteService.getPostulantes(resp[0].id_termino_referencia).subscribe(res => {
          console.log('getPostulantes', res);
          this.postulantes = res;
          console.log(this.postulantes);
        })

        this.forma_adju = resp[0].forma_adjudicacion
        this.met_sel_adj = resp[0].metodo_seleccion_adjudicacion
        //forma_adjudicacion checked  Método de Selección y Adjudicación
        if (resp[0].forma_adjudicacion == "1") {
          $('#formAdj1').prop('checked', true);
        }
        if (resp[0].forma_adjudicacion == "2") {
          $('#formAdj2').prop('checked', true);
        }
        if (resp[0].forma_adjudicacion == "3") {
          $('#formAdj3').prop('checked', true);
        }
        //Método de Selección y Adjudicación checked
        if (resp[0].metodo_seleccion_adjudicacion == "1") {
          $('#metSA1').prop('checked', true);
        }
        if (resp[0].metodo_seleccion_adjudicacion == "2") {
          $('#metSA2').prop('checked', true);
        }
        if (resp[0].metodo_seleccion_adjudicacion == "3") {
          $('#metSA3').prop('checked', true);
        }
        if (resp[0].metodo_seleccion_adjudicacion == "4") {
          $('#metSA4').prop('checked', true);
        }
        if (resp[0].metodo_seleccion_adjudicacion == "5") {
          $('#metSA5').prop('checked', true);
        }
      })
    })

    /* Selecciona solo un checkbox */
    $(".formContr").on("change", function () {
      $(".formContr").not(this).prop("checked", false);
    });
    $(".formAd").on("change", function () {
      $(".formAd").not(this).prop("checked", false);
    });
    $(".metSelyAdj").on("change", function () {
      $(".metSelyAdj").not(this).prop("checked", false);
    });
  }

  /* Almacena valores del checkbox */
  onCheckFormCont(event, valCond) {
    if (valCond == "forma_adj") {
      this.forma_adj = parseInt(event.target.value);
      console.log(this.forma_adj);
    }
    if (valCond == "met_sel_adj") {
      this.met_sel_adj = parseInt(event.target.value)
    }
  }

  onSubmit() {
    //sino toco el check de 'Forma de Adjudicación', entonces se guarda con el mismo dato 
    if (this.forma_adj == undefined) {
      this.formularioForm.value.forma_adjudicacion = this.forma_adju
    } else {
      this.formularioForm.value.forma_adjudicacion = this.forma_adj;
    }
    //sino toco el check de 'Método de Selección y Adjudicación', entonces se guarda con el mismo dato 
    if (this.met_sel_adj == undefined) {
      this.formularioForm.value.metodo_seleccion_adjudicacion = this.metodo_sel_ad;
    } else {
      this.formularioForm.value.metodo_seleccion_adjudicacion = this.met_sel_adj;
    }
    this.formularioForm.value.id_postulantes = (parseInt(this.filtrar.match(/[0-9]+/g)))
    this.formularioForm.value.id_termino_referencia = parseInt(this.id)
    this.formularioForm.value.pac = this.pac;

    console.log(this.formularioForm.value);
 
    this._rrhhService.putTdr(this.formularioForm.value, this.id).subscribe(res => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Formulario FUC actualizado correctamente.',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        this.router.navigate([`/fuc-visualizar/${this.id}/unidadSolicitante`]);

      }, 3000)
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
  }
}