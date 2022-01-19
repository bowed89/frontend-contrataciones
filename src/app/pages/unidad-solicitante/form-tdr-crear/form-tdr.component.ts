import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';

import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-form-tdr',
  templateUrl: './form-tdr.component.html',
  styleUrls: ['./form-tdr.component.css']
})
export class FormTdrCrearComponent implements OnInit {
  submitted: boolean = false;

  fieldArray: Array<any> = [];
  newAttribute: any = {};
  fieldArrayJ: Array<any> = [];
  newAttributeJ: any = {};

  fieldArrayAd: Array<any> = [];
  newAttributeAd: any = {};

  fieldArrayDocs: Array<any> = [];
  newAttributeDocs: any = {};


  fieldArray2: Array<any> = [];
  newAttribute2: any = {};
  fieldArray3: Array<any> = [];
  newAttribute3: any = {};

  tdrForm: FormGroup;
  cuadroEqu: any;
  expesp_anio: string;
  expesp_mes: string;
  expgen_anio: string;
  expgen_mes: string;
  proyectos: any;
  initialDate: string;
  formatFutureDate: string;
  inputMonth: number;
  inputDay: number;

  resCalculo: number;
  months: number;
  days: number;
  denominacionP: number;
  find: object;
  idModalidadC: string;
  sede_trabajo: string
  selectCurso: any = {};
  desabilitarBtn: boolean = true;
  disableDate: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _unidadSolicitanteService: UnidadSolicitanteService,
  ) {
    this.tdrForm = this.fb.group({
      id_cuadro_equivalencia: ["", Validators.required],
      id_proyecto: ["", Validators.required],
      id_gestion: ["1"],
      objeto_contratacion: ["", Validators.required],
      modalidad_contratacion: ["", Validators.required],
      fecha_inicio: ["", Validators.required],
      meses_contrato: ["", Validators.required],
      dias_contrato: ["", Validators.required],
      //sueldo_total: ["", Validators.required],
      antecedentes: ["", Validators.required],
      justificacion: ["", Validators.required],
      objetivo_consultoria: ["", Validators.required],
      //resultados_esperados: ["", Validators.required],
      perfil_formacion_min: ["", Validators.required],
      perfil_cursos_req: ["", Validators.required],
      perfil_exp_gral: ["", Validators.required],
      perfil_exp_esp: ["", Validators.required],
      documentos_presentar: ["", Validators.required],
      id_usuarios: ["", Validators.required],
      usuario: ["1"],
      funciones: this.fb.array([]),
      // actividades: this.fb.array([]),
      sede_trabajo: ["", Validators.required],
      id_tdr_principal: ["0"],
      lugar_horario: [""]
    });
  }

  ngOnInit(): void {
    var disabled = moment();
    this.disableDate = moment(disabled['_d']).format("YYYY-MM-DD");
    console.log('ssss', this.disableDate)

    this._unidadSolicitanteService.getCuadroE().subscribe(res => {
      this.cuadroEqu = res;
      console.log('this.cuadroEqu--->', this.cuadroEqu);
    })
    this._unidadSolicitanteService.getProyecto().subscribe(res => {
      console.log('res --->', res);
      this.proyectos = res;
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.tdrForm.controls; }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    console.log(this.fieldArray);
    this.newAttribute = {};
  }
  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addFieldValueJ() {
    this.fieldArrayJ.push(this.newAttributeJ)
    console.log(this.fieldArrayJ);
    this.newAttributeJ = {};
  }
  deleteFieldValueJ(index) {
    this.fieldArrayJ.splice(index, 1);
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

  addFieldValue3() {
    this.fieldArray3.push({
      code: this.tdrForm.value.perfil_cursos_req,
      curso: this.selectCurso
    })
    this.tdrForm.get('perfil_cursos_req').reset();
    this.selectCurso = {};
    console.log(this.fieldArray3);

  }

  deleteFieldValue3(index) {
    this.fieldArray3.splice(index, 1);
  }

  onSubmit() {
    console.log('respuesta')
    this.submitted = true;
    var aux_res = [];
    var aux_fun = [];
    var aux_act = [];
    var aux_jus = [];
    var aux_docs = [];


    for (let i in this.fieldArray) {
      aux_res.push(this.fieldArray[i].code);
    }
    for (let i in this.fieldArray2) {
      aux_fun.push(this.fieldArray2[i].code);
    }
    for (let i in this.fieldArrayAd) {
      aux_act.push(this.fieldArrayAd[i].code);
    }
    for (let i in this.fieldArrayJ) {
      aux_jus.push(this.fieldArrayJ[i].code);
    }
    for (let i in this.fieldArrayDocs) {
      aux_docs.push(this.fieldArrayDocs[i].code);
    }

    //this.tdrForm.value.resultados_esperados = aux_res.join();
    this.tdrForm.value.funciones = aux_fun.join(';');
    // this.tdrForm.value.perfil_cursos_req =  (this.fieldArray3).replace(/,/g, '.')  arr.join(',').replace(/,/g, '/').split();
    var aux = []
    this.fieldArray3.forEach(res => {
      aux.push(res.code + " " + res.curso);
    })
    console.log('aux', aux)
    this.tdrForm.value.perfil_cursos_req = aux.join(';');
    this.tdrForm.value.sueldo_total = (this.resCalculo).toString()

    this.tdrForm.value.justificacion = aux_jus.join(';');
    this.tdrForm.value.actividades = aux_act.join(';');
    this.tdrForm.value.documentos_presentar = aux_docs.join(';');
    this.tdrForm.value.referencia = 'DICIE'
    this.tdrForm.value.id_usuarios = parseInt(localStorage.getItem('id_usuario'));
    this.tdrForm.value.modalidad_contratacion = parseInt(this.idModalidadC)
    this.tdrForm.value.expgen_anio = this.expgen_anio
    this.tdrForm.value.expgen_mes = this.expgen_mes
    this.tdrForm.value.expesp_anio = this.expesp_anio
    this.tdrForm.value.expesp_mes = this.expesp_mes
    console.log(this.tdrForm.value.perfil_cursos_req);
    console.log(this.tdrForm.value.perfil_cursos_req);
    console.log(this.tdrForm.value)

    // eliminar a)   b)    c) .... de funciones
    let separarArray = (this.tdrForm.value.funciones).split(';');
    let ex;
    let ex2 = []
    for (let i in separarArray) {
      let primerValor = separarArray[i].substring(0, 4);
      if (primerValor.includes(')')) {
        ex = separarArray[i].replace(separarArray[i].substring(0, 3), '')
        ex2.push(ex)
        this.tdrForm.value.funciones = ex2.join(';')

      }
    }

    // eliminar •	Hoja  •	Hoj22 •	Hoja4 ... de documentos a presentar
    let separarArray2 = (this.tdrForm.value.documentos_presentar).split(';');
    let doc1;
    let doc2 = []
    for (let i in separarArray2) {
      let primerValor = separarArray2[i].substring(0, 2);
      if (primerValor.includes('•')) {
        doc1 = separarArray2[i].replace(separarArray2[i].substring(0, 2), '')
        doc2.push(doc1)
        this.tdrForm.value.documentos_presentar = doc2.join(';')
      } else {
      }
    }

    // eliminar a)   b)    c) .... de actividades adicionales
    let separarArray3 = (this.tdrForm.value.actividades).split(';');
    let ex3;
    let ex4 = []
    for (let i in separarArray3) {
      let primerValor = separarArray3[i].substring(0, 4);
      if (primerValor.includes(')')) {
        ex3 = separarArray3[i].replace(separarArray3[i].substring(0, 3), '')
        ex4.push(ex3)
        this.tdrForm.value.actividades = ex4.join(';')
      }
    }

    console.log(this.tdrForm.value)

    this._unidadSolicitanteService.postTdr(this.tdrForm.value).subscribe(res => {

      console.log('respuesta3')
      console.log(res)
      var id = res['datos']['fn_evapost_terminos_referencia_adicion'];
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Formulario TDR almacenado correctamente.',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        this.router.navigate([`/tdr-visualizar/${id}`]);
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
      // Decimales
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

  desabilitar() {
    this.desabilitarBtn = false;
  }

  decimalMeses() {

  }



  
  campoEsValido( campo: string ) {
    return this.tdrForm.controls[campo].errors && this.tdrForm.controls[campo].touched;
  }


}


