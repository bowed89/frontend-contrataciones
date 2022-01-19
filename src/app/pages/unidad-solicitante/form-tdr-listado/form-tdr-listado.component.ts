import { Component, OnInit } from '@angular/core';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import Swal from 'sweetalert2'
import * as moment from 'moment';
import { UsaService } from 'src/app/Services/usa.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-form-tdr-listado',
  templateUrl: './form-tdr-listado.component.html',
  styleUrls: ['./form-tdr-listado.component.css']
})
export class FormTdrListadoComponent implements OnInit {
  idFuc: any;
  tdrLists: any;
  pageActual: number = 1;
  resTdrFuc: Array<any> = [];
  cols: any[];
  terminoRef: any;
  /* Agregar nuevo fuc */
  formularioForm: FormGroup;
  formulario_create: object;
  postulantes: any;
  forma_adj: any;
  met_sel_adj: any;
  form_req_obl: any;

  id: any;
  idDireccion: number
  flag = true;
  flagPAC = false;
  getIdGrupo: number;
  resCalculo: any;
  montoTotalBD: any;
  disabledBtn = true;
  correlativoInicial: number = 0;

  constructor(
    private _unidadSolicitanteService: UnidadSolicitanteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

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
    this.formularioForm = this.formBuilder.group({
      id_termino_referencia: ["", Validators.required],
      id_postulantes: ["", Validators.required],
      forma_adjudicacion: ["", Validators.required],
      metodo_seleccion_adjudicacion: ["", Validators.required],
      pac: [""],
    });

    // nombres de columnas de las tablas
    this.cols = [
      { field: 'cargo', header: 'DENOMINACIÓN DEL PUESTO' },
      { field: 'fecha_inicio', header: 'FECHA DE INICIO' },
      { field: 'detalle', header: 'DIRECCIÓN' },
      { field: 'detalle_proyecto', header: 'PROYECTO' },
      { header: 'GENERAR FUC' },
      { header: 'ACCIONES' }
    ];

    this._unidadSolicitanteService.getTdr().subscribe(res => {
      console.log(res);
      this.terminoRef = res
      this.tdrLists = res;
      for (let i in this.tdrLists) {
        this._unidadSolicitanteService.findIdTdrinFuc(this.tdrLists[i].id_termino_referencia).subscribe(resp => {
          for (let i in resp) {
            this.resTdrFuc.push(resp[i].id_termino_referencia)
          }
        })
      }
    })
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
  //Add new formulario_contratacion
  onSubmit() {
    var actualDate = moment()
    var date = moment(actualDate['_d']).format('YYYY-MM-DD')
    var aux = this.formularioForm.value.id_postulantes.match(/[0-9]+/g);

    this.formularioForm.value.id_termino_referencia = parseInt(this.id)//
    this.formularioForm.value.id_postulantes = parseInt(aux)//
    this.formularioForm.value.forma_adjudicacion = this.forma_adj;//
    this.formularioForm.value.metodo_seleccion_adjudicacion = this.met_sel_adj;//
    this.formularioForm.value.created_at = date;//

    // correlativo inicio
    let getIdUser = parseInt(localStorage.getItem('id_usuario'));
    this._unidadSolicitanteService.getUsuario(getIdUser).subscribe(res => {
      console.log(res);
      if (res[0].correlativo == null || res[0].correlativo == 0) {
        console.log('correlativo null o cero');
        let object = {
          correlativo: 1
        }
        this._unidadSolicitanteService.putCorrelativo(object, getIdUser).subscribe(resp => {
          this.formularioForm.value.correlativo = resp['datos']['rows'][0]['correlativo'];
          // Agrega formulario fuc
          this._unidadSolicitanteService.postFuc(this.formularioForm.value).subscribe(res => {
            var idForm;
            for (let i in res) {
              idForm = res[i].id_formulario_contratacion
            }
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Formulario FUC registrado correctamente.',
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              this.closeAdd()
              this.router.navigate([`/fuc-visualizar/${idForm}/unidadSolicitante`]);
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
        })
      } else {
        console.log('correlativo not null', res[0].correlativo);
        let sum = res[0].correlativo + 1;
        let object2 = {
          correlativo: sum
        }
        this._unidadSolicitanteService.putCorrelativo(object2, getIdUser).subscribe(resp => {
          this.formularioForm.value.correlativo = resp['datos']['rows'][0]['correlativo'];
          // Agrega formulario fuc
          this._unidadSolicitanteService.postFuc(this.formularioForm.value).subscribe(res => {
            var idForm;
            for (let i in res) {
              idForm = res[i].id_formulario_contratacion
            }
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Formulario FUC registrado correctamente.',
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              this.closeAdd()
              this.router.navigate([`/fuc-visualizar/${idForm}/unidadSolicitante`]);
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
        })
      }
    })
    console.log(this.formularioForm.value);
    // correlativo fin
  }

  founded(item) {
    return this.resTdrFuc.find(x => x === item)
  }

  evento(event) {
    this.id = parseInt(event.target.value);
    console.log('click', this.id);
    /* Agregar Fuc */
    this._unidadSolicitanteService.getTdrId(this.id).subscribe(res => {
      console.log('pac', res[0].sueldo_total);
      this.montoTotalBD = res[0].sueldo_total
      if (res[0].sueldo_total <= 20000) {
        console.log('menor a 20000');
        this.flagPAC = true;
        this.disabledBtn = true;
      } else {
        //se habilita el input de PAC
        console.log('mayor a 20000');
        this.flagPAC = false;
        // verifica si se lleno el input, sino esta lleno entonces esta deshabilitado el btn "Guardar"
        this.changeBtn()
      }
      console.log(res);
      //calcular sueldo total
      const sueldoDiario = res[0].sueldo / 30;
      const resultadoMeses = res[0].meses_contrato * res[0].sueldo;
      const resultadoDias = res[0].dias_contrato * sueldoDiario;
      this.resCalculo = Math.round(((resultadoDias + resultadoMeses) - sueldoDiario) * 100) / 100
    })

    this._unidadSolicitanteService.getPostulantes(this.id).subscribe(res => {
      this.postulantes = res;
      console.log('postulantes', this.postulantes);
    })

    var boolean = (this.resTdrFuc.indexOf(parseInt(event.target.value)) > -1);
    if (boolean) {
      // si ya esta creado el fuc obtenemos su id del fuc ya registrado mediante el id del tdr seleccionado
      this._unidadSolicitanteService.getFucByIdTdr(event.target.value).subscribe(res => {
        console.log(res);
        this.router.navigate(['/fuc-visualizar', res[0].id_formulario_contratacion, 'unidadSolicitante'])
      }, (error) => {
        console.log(error);
      })
    } else {
      $('#modalAdd').modal('show')
    }
  }

  closeAdd() {
    $('#modalAdd').modal('hide')
  }

  changeBtn() {
    let pacAux = this.formularioForm.value.pac;
    console.log('pacAux.length', pacAux.length);
    if (pacAux.length > 0) {
      this.disabledBtn = true;
      console.log('tiene datos');
    } else {
      this.disabledBtn = false;
      console.log('no tiene datos');
    }
  }

  editLink(value, id) {
    this.router.navigate(['/form-tdr-editar-pre', id]);
  }

  campoEsValido( campo: string ) {
    return this.formularioForm.controls[campo].errors && this.formularioForm.controls[campo].touched;
  }

}
