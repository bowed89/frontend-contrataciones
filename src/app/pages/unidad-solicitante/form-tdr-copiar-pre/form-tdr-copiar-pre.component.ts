import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';

import Swal from 'sweetalert2'
import * as moment from 'moment';
import { NumeroALetra } from '../../tools/NumeroALetra';

@Component({
  selector: 'app-form-tdr-editar',
  templateUrl: './form-tdr-copiar-pre.component.html',
  styleUrls: ['./form-tdr-copiar-pre.component.css']
})
export class FormTdrCopiarPreComponent implements OnInit {
  submitted: boolean = false;

  res: object = {};
  meses_contrato: string;
  resCalculo: number;


  jusAttribute: any;

  newAttribute3: any;
  selectCurso: Array<any> = [];
  cursoObject: Array<any> = [] //

  fieldArray2: Array<any> = [];
  newAttribute2: any = {};

  fieldArrayJ: Array<any> = [];
  newAttributeJ: any = {};

  fieldArrayAd: Array<any> = [];
  newAttributeAd: any = {};

  fieldArrayDocs: Array<any> = [];
  newAttributeDocs: any = {};


  tdrForm: FormGroup;
  id: number;
  proyectos: any;
  cuadroEqu: any;
  expesp_anio: string;
  expesp_mes: string;
  expgen_anio: string;
  expgen_mes: string;
  denominacion: any;
  initialDate: string;
  formatFutureDate: string;
  inputMonth: number;
  inputDay: number;
  fechaFin: string;
  fechaInicio: string;
  denominacionP: number;
  disableDate: any;

  idModalidadC: string;
  idConv: any;
  auxCopiar: Array<any> = [];
  merge: Array<any> = [];
  deshabilitarPest: boolean = true;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _unidadSolicitanteService: UnidadSolicitanteService
  ) {
    this.tdrForm = this.fb.group({
      id_cuadro_equivalencia: ["", Validators.required],
      objeto_contratacion: ["", Validators.required],
      id_proyecto: ["", Validators.required],
      id_gestion: ["", Validators.required],
      id_usuarios: ["", Validators.required],
      usuario: ["1"],
      objetivo_consultoria: ["", Validators.required],
      perfil_formacion_min: ["", Validators.required],
      perfil_cursos_req: ["", Validators.required],
      perfil_exp_gral: ["", Validators.required],
      perfil_exp_esp: ["", Validators.required],
      documentos_presentar: ["", Validators.required],
      // meses_contrato: ["", Validators.required],
      // dias_contrato: ["", Validators.required],
      modalidad_contratacion: ["", Validators.required],
      // resultados_esperados: ["", Validators.required],
      fecha_inicio: ["", Validators.required],
      forma_contrato: ["", Validators.required],
      antecedentes: ["", Validators.required],
      justificacion: ["", Validators.required],
      created_at: ["", Validators.required],
      sede_trabajo: ["", Validators.required],
      area: [""],
      lugar_horario: [""],
      supervision_dep: [""],
      honorarios_me: [""]
    });
  }

  ngOnInit(): void {
    var disabled = moment();
    this.disableDate = moment(disabled['_d']).format("YYYY-MM-DD");
    console.log('ssss', this.disableDate)

    this.activatedRoute.params.subscribe(param => {
      var arrayCursos = []
      this.id = param['id']
      this._unidadSolicitanteService.getPreTdrById(this.id).subscribe(resp => {
        console.log('resp=>', resp);

        console.log(this.deshabilitarPest);
        if (resp[0].puesto_cargo == 'SUPERVISOR DE CAMPO' || resp[0].puesto_cargo == 'ENCUESTADOR') {
          this.deshabilitarPest = false;
          console.log(this.deshabilitarPest);
        } else {
          this.deshabilitarPest = true;
          console.log(this.deshabilitarPest);
        }

        this.idConv = resp[0].id_convocatoria;


        // *** INICIO separando 1 LA PAZ, 2 COCHAMBAMBA, ETC...
        let num_v = (resp[0].num_vacancia).split(',')
        let spliceNum = [];
        let spliceDep = [];

        console.log('num_v', num_v);
        for (let i in num_v) {
          spliceNum.push((num_v[i]).slice(0, 2)); // almacena solo los numeros 
          spliceDep.push((num_v[i]).slice(2)); // almacena los nom de los dep
        }
        console.log('spliceNum', spliceNum);
        console.log('spliceDep', spliceDep);

        for (let i = 0; i < spliceNum.length; i++) {
          this.merge.push({
            dep: spliceDep[i],
            num: spliceNum[i]
          })
        }
        console.log('merge', this.merge); // [ 0: {dep: "ORURO", num: "1 "}, 1: {dep: "LA PAZ", num: "12"} ]
        // *** FIN separando 1 LA PAZ, 2 COCHAMBAMBA, ETC...

        var split = (resp[0].cursos_requeridos).split(';')
        for (let i in split) {
          var split22 = (split[i]).split('(')
          split22[1] = "(" + split22[1]
          arrayCursos.push(split22)
        }
        console.log('arrayCursos', arrayCursos);
        this.res = resp;
        this.inputMonth = this.res[0].meses_contrato
        this.inputDay = this.res[0].dias_contrato

        this._unidadSolicitanteService.getCuadroE().subscribe(res => {
          this.cuadroEqu = res;
          console.log('this.cuadroEqu--->', this.cuadroEqu);
          this.cambioFechas()
        })
        this._unidadSolicitanteService.getProyecto().subscribe(res => {
          this.proyectos = res;
        })
        var curso0 = [];
        var curso1 = [];

        for (let i in arrayCursos) {
          curso0.push(arrayCursos[i][0])
          curso1.push(arrayCursos[i][1])
        }
        for (let i in arrayCursos) {
          this.cursoObject.push({
            cu: curso0[i]
          })
        }
        // seleccionamos desde la bd(deseable, indispensable) al dropdown de la vista
        for (let i in curso1) {
          this.selectCurso.push(curso1[i])
        }


        const input = this.res[0].fecha_inicio
        this.fechaInicio = moment.utc(input).format('YYYY-MM-DD');
        const addDays = moment(this.fechaInicio).add(this.res[0].dias_contrato, 'days')
        const addMonths = moment(addDays).add(this.res[0].meses_contrato, 'months')
        this.fechaFin = moment.utc(addMonths['_d']).format('YYYY-MM-DD');

        //mostramos en el select el valor de la bd q estaba almacenado para actualizar
        this.tdrForm.controls['id_cuadro_equivalencia'].setValue(this.res[0].id_cuadro);
        this.tdrForm.controls['sede_trabajo'].setValue(this.res[0].sede_trabajo);
        this.tdrForm.controls['id_proyecto'].setValue(this.res[0].id_proyecto);
        this.tdrForm.controls['modalidad_contratacion'].setValue(this.res[0].modalidad_contratacion);

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
        let montoNumero = NumeroALetra.NumeroALetras(parseInt(this.res[0].remuneracion), 0);
        let montoConcat = `La forma de pago será mensual por un monto equivalente a Bs.${ this.res[0].remuneracion } (${ montoNumero }00/100 Bolivianos).`;

        this.tdrForm.patchValue({
          id_cuadro_equivalencia: this.tdrForm.value.id_cuadro_equivalencia,
          id_proyecto: this.res[0].id_proyecto,
          id_gestion: 1,
          id_usuarios: parseInt(localStorage.getItem('id_usuario')),
          objeto_contratacion: this.res[0].puesto_cargo,
          fecha_inicio: this.fechaInicio,
          usuario: ["1"],
          antecedentes: this.res[0].antecedentes,
          justificacion: this.res[0].justificacion,
          objetivo_consultoria: this.res[0].objetivo_consultoria,
          perfil_formacion_min: this.res[0].formacion,
          perfil_cursos_req: this.res[0].perfil_cursos_req,
          perfil_exp_gral: this.res[0].desc_expgeneral,
          perfil_exp_esp: this.res[0].desc_expespecifica,
          documentos_presentar: this.res[0].documentos_presentar,
          modalidad_contratacion: this.res[0].modalidad_contratacion,
          funciones: this.res[0].funciones,
          actividades: this.res[0].actividades,
          created_at: formatDate(current),
          honorarios_me: montoConcat

        })
      })
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.tdrForm.controls; }

  /* Borrar y agregar campos del input dinamico  */

  addFieldValueJ() {
    this.fieldArrayJ.push(this.newAttributeJ)
    console.log(this.fieldArrayJ);
    this.newAttributeJ = {};
  }
  deleteFieldValueJ(index) {
    this.fieldArrayJ.splice(index, 1);
  }

  addCursoValue() {
    this.cursoObject.push({
      cu: this.newAttribute3
    })
  }
  deleteCursoValue(index) {
    this.cursoObject.splice(index, 1)//delete input
    this.selectCurso.splice(index, 1);//delete select
  }

  addFieldValue2() {
    this.fieldArray2.push(this.newAttribute2)
    console.log(this.fieldArray2);
    this.newAttribute2 = {};
  }
  deleteFieldValue2(index) {
    this.fieldArray2.splice(index, 1);
  }

  addFieldValueAd() {
    this.fieldArrayAd.push(this.newAttributeAd)
    this.newAttributeAd = {};
  }
  deleteFieldValueAd(index) {
    this.fieldArrayAd.splice(index, 1);
  }

  addFieldValueDocs() {
    this.fieldArrayDocs.push(this.newAttributeDocs)
    this.newAttributeDocs = {};
  }
  deleteFieldValueDocs(index) {
    this.fieldArrayDocs.splice(index, 1);
  }

  onSubmit() {
    var cursoFinal = []
    var aux_jus = [];
    var aux_fun = [];
    var aux_act = [];
    var aux_docs = [];


    console.log(this.cursoObject);
    console.log(this.selectCurso);
    for (let i in this.cursoObject) {
      cursoFinal.push({
        cursoInput: this.cursoObject[i].cu,
        cursoSelect: this.selectCurso[i]
      })
    }
    var cursoFinal2 = []
    for (let i in cursoFinal) {
      console.log(`${cursoFinal[i].cursoInput} ${cursoFinal[i].cursoSelect}`);
      cursoFinal2.push(`${cursoFinal[i].cursoInput} ${cursoFinal[i].cursoSelect}`)
    }
    for (let i in this.fieldArray2) {
      aux_fun.push(this.fieldArray2[i].code);
    }
    for (let i in this.fieldArrayJ) {
      aux_jus.push(this.fieldArrayJ[i].code);
    }

    for (let i in this.fieldArrayAd) {
      aux_act.push(this.fieldArrayAd[i].code);
    }
    for (let i in this.fieldArrayDocs) {
      aux_docs.push(this.fieldArrayDocs[i].code);
    }

    this.tdrForm.value.perfil_cursos_req = cursoFinal2.join(';');
    this.tdrForm.value.funciones = aux_fun.join(';');
    this.tdrForm.value.justificacion = aux_jus.join(';');
    this.tdrForm.value.actividades = aux_act.join(';');
    this.tdrForm.value.documentos_presentar = aux_docs.join(';');

    this.tdrForm.value.expgen_anio = this.expgen_anio
    this.tdrForm.value.expgen_mes = this.expgen_mes
    this.tdrForm.value.expesp_anio = this.expesp_anio
    this.tdrForm.value.expesp_mes = this.expesp_mes
    this.tdrForm.value.id_tdr_principal = this.id
    this.tdrForm.value.meses_contrato = this.inputMonth;
    this.tdrForm.value.dias_contrato = this.inputDay;
    this.tdrForm.value.id_dep = this.id;
    this.tdrForm.value.sueldo_total = this.resCalculo
    this.tdrForm.value.id_convocatoria = parseInt(this.idConv)
    this.tdrForm.value.cantidad = this.merge

    console.log(this.tdrForm.value);

    this._unidadSolicitanteService.postTdrPre(this.tdrForm.value).subscribe(res => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Formulario(s) TDR generado(s) correctamente.',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        this.router.navigate([`/formulario-prelistado`]);
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

  cambioFechas() {
    if (this.inputDay >= 0 && this.inputMonth > 0) {
      // Decimales si existen en el input meses ej. 3.5
      const checkDecimal = this.inputMonth % 1;
      if (checkDecimal != 0) {
        this.inputDay = 15;
        this.inputMonth = Math.floor(this.inputMonth)
      }

      var b = moment(this.initialDate, "YYYY.MM.DD");
      var futureMonth = moment(b).add(this.inputDay, 'days').add(this.inputMonth, 'months');
      this.formatFutureDate = moment(futureMonth['_d']).format("YYYY-MM-DD");

      console.log(this.formatFutureDate);
      // Calculo del sueldo
      const find = this.cuadroEqu.filter(el => el.id_cuadro == this.denominacionP)

      console.log('find ===> ', find);

      this.expgen_anio = find[0].expgen_anio;
      this.expgen_mes = find[0].expgen_mes;
      this.expesp_anio = find[0].expesp_anio;
      this.expesp_mes = find[0].expesp_mes;


      console.log('find', find);
      console.log('this.denominacionP', this.denominacionP);
      // se multiplica el sueldo del espcialista por los meses y se resta por un dia / Cualquier mes equivale a 30 dias, se resta un dia 
      const sueldoDiario = find[0].sueldo / 30;
      const resultadoMeses = this.inputMonth * find[0].sueldo;
      const resultadoDias = (this.inputDay * sueldoDiario);
      this.resCalculo = Math.round(((resultadoDias + resultadoMeses) - sueldoDiario) * 100) / 100
      console.log('meses ganado:', resultadoMeses);
      console.log('dias ganado:', resultadoDias);
      console.log('total ganado:', this.resCalculo);

      //llenando automatico el select "Modalidad contratación"
      if (this.resCalculo <= 50000) {
        this.idModalidadC = "1"
      }
      if (this.resCalculo > 50000 && this.resCalculo <= 200000) {
        this.idModalidadC = "2"
      }
      if (this.resCalculo > 200000 && this.resCalculo <= 1000000) {
        this.idModalidadC = "3"
      }
      if (this.resCalculo > 1000000) {
        this.idModalidadC = "4"
      }
    } else {
      this.inputDay = 0;
      this.inputMonth = 0;
    }

  }



}

