import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-form-tdr-editar',
  templateUrl: './form-tdr-editar.component.html',
  styleUrls: ['./form-tdr-editar.component.css']
})
export class FormTdrEditarComponent implements OnInit {

  resArray: Array<any> = [];
  resAttribute: any;
  resObject: Array<any> = [];

  funArray: Array<any> = [];
  funAttribute: any;
  funObject: Array<any> = [];

  actArray: Array<any> = [];
  actAttribute: any;
  actObject: Array<any> = [];

  jusArray: Array<any> = [];
  jusAttribute: any;
  fieldObjectJ: Array<any> = [];

  tdrForm: FormGroup;
  id: number;
  resCalculo: number;
  proyectos: any;
  cuadroEqu: any;
  expesp_anio: string;
  expesp_mes: string;
  expgen_anio: string;
  expgen_mes: string;
  sede_trabajo: string
  denominacion: any;
  initialDate: string;
  formatFutureDate: string;

  endDate: string;
  inputMonth: number;
  inputDay: number;
  fechaFin: string;
  fechaInicio: string;


  docsArray: Array<any> = [];
  docsAttribute: any;
  docsObject: Array<any> = [];

  fieldArray3: Array<any> = [];
  newAttribute3: any;
  selectCurso: Array<any> = [];
  cursoObject: Array<any> = []

  denominacionP: number;
  idModalidadC: string;
  disableDate: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _unidadSolicitanteService: UnidadSolicitanteService
  ) {
    this.tdrForm = this.fb.group({
      id_cuadro_equivalencia: ["", Validators.required],
      objeto_contratacion: ["", Validators.required],
      id_proyecto: ["", Validators.required],
      id_gestion: ["", Validators.required],
      objetivo_consultoria: ["", Validators.required],
      perfil_formacion_min: ["", Validators.required],
      perfil_cursos_req: ["", Validators.required],
      perfil_exp_gral: ["", Validators.required],
      perfil_exp_esp: ["", Validators.required],
      documentos_presentar: ["", Validators.required],
      meses_contrato: ["", Validators.required],
      dias_contrato: ["", Validators.required],
      modalidad_contratacion: ["", Validators.required],
      resultados_esperados: ["", Validators.required],
      fecha_inicio: ["", Validators.required],
      forma_contrato: ["", Validators.required],
      antecedentes: ["", Validators.required],
      justificacion: ["", Validators.required],
      objetivo_cons: ["", Validators.required],
      sede_trabajo: ["", Validators.required],
    });

  }


  ngOnInit(): void {
    var disabled = moment();
    this.disableDate = moment(disabled['_d']).format("YYYY-MM-DD");

    this.activatedRoute.params.subscribe(param => {
      var arrayCursos = []
      this.id = param['id'];
      this._unidadSolicitanteService.getTdrId(this.id).subscribe(res => {
        this._unidadSolicitanteService.getCuadroE().subscribe(res => {
          this.cuadroEqu = res;
          this.cambioFechas();
          console.log(res);
        })
        this._unidadSolicitanteService.getProyecto().subscribe(res => {
          console.log('res --->', res);
          this.proyectos = res;
        })

        console.log(res);
        console.log(res[0].perfil_cursos_req);
        var split = (res[0].perfil_cursos_req).split(';')
        for (let i in split) {
          var split22 = (split[i]).split('(')
          split22[1] = "(" + split22[1]
          arrayCursos.push(split22)
        }
        console.log(arrayCursos);

        for (let i in res) {
          //llena en los inputs de res, actividades, funciones los datos y lo transforma en array
          //this.resArray = (res[i].resultados_esperados).split(',');
          this.funArray = (res[i].funciones).split(';');
          this.actArray = (res[i].actividades).split(';');
          this.jusArray = (res[i].justificacion).split(';');
          this.docsArray = (res[i].documentos_presentar).split(';');

          var curso0 = [];
          var curso1 = [];

          for (let i in arrayCursos) {
            curso0.push(arrayCursos[i][0]) //["ssddsdsdsdscargo", "Post grado relacionado al cargo", "ssddsdsdsdscargo"]
            curso1.push(arrayCursos[i][1]) //["(Indispensable)", "(Deseable)", "(Indispensable)"]
          }
          for (let i in arrayCursos) {
            this.cursoObject.push({
              cu: curso0[i]
            })
          }
          // seleccionamos desde la bd(deseable, indispensable) al dropdown de la vista
          for (let i in curso1) {
            this.selectCurso.push(curso1[i])
            console.log('sdsdssdsdsdsd', this.selectCurso);
          }

          for (let i in this.resArray) {
            this.resObject.push({
              re: this.resArray[i]
            })
          }
          for (let i in this.docsArray) {
            this.docsObject.push({
              doc: this.docsArray[i]
            })
            console.log(this.docsObject);
          }
          for (let i in this.funArray) {
            this.funObject.push({
              fu: this.funArray[i]
            })
          }
          for (let i in this.actArray) {
            this.actObject.push({
              ac: this.actArray[i]
            })
          }
          for (let i in this.jusArray) {
            this.fieldObjectJ.push({
              ju: this.jusArray[i]
            })
          }

          const input = res[i].fecha_inicio
          this.fechaInicio = moment.utc(input).format('YYYY-MM-DD');
          const addDays = moment(this.fechaInicio).add(res[i].dias_contrato, 'days')
          const addMonths = moment(addDays).add(res[i].meses_contrato, 'months')
          this.fechaFin = moment.utc(addMonths['_d']).format('YYYY-MM-DD');


          //mostramos en el select el valor de la bd q estaba almacenado para actualizar
          this.tdrForm.controls['id_cuadro_equivalencia'].setValue(res[i].id_cuadro);
          this.tdrForm.controls['sede_trabajo'].setValue(res[i].sede_trabajo);
          this.tdrForm.controls['id_proyecto'].setValue(res[i].id_proyecto);
          this.tdrForm.controls['modalidad_contratacion'].setValue(res[i].modalidad_contratacion);

          this.tdrForm.patchValue({
            id_cuadro_equivalencia: this.tdrForm.value.id_cuadro_equivalencia,
            id_proyecto: res[i].id_proyecto,
            id_gestion: 1,
            objeto_contratacion: res[i].objeto_contratacion,
            fecha_inicio: this.fechaInicio,
            antecedentes: res[i].antecedentes,
            justificacion: res[i].justificacion,
            objetivo_consultoria: res[i].objetivo_consultoria,
            perfil_formacion_min: res[i].perfil_formacion_min,
            perfil_cursos_req: res[i].perfil_cursos_req,
            perfil_exp_gral: res[i].perfil_exp_gral,
            perfil_exp_esp: res[i].perfil_exp_esp,
            documentos_presentar: res[i].documentos_presentar,
            meses_contrato: res[i].meses_contrato,
            dias_contrato: res[i].dias_contrato,
            modalidad_contratacion: res[i].modalidad_contratacion,
            funciones: res[i].funciones,
            actividades: res[i].actividades,
          })
        }
      })
    })
  }

  /* Borrar y agregar campos del input dinamico  */
  addCursoValue() {
    this.cursoObject.push({
      cu: this.newAttribute3
    })
  }
  deleteCursoValue(index) {
    this.cursoObject.splice(index, 1)//delete input
    this.selectCurso.splice(index, 1);//delete select
  }

  deleteResdValue(index) {
    this.resObject.splice(index, 1);
  }
  addResdValue() {
    this.resObject.push({
      res: this.resAttribute
    })
  }
  deleteFunValue(index) {
    this.funObject.splice(index, 1);
  }
  addFunValue() {
    this.funObject.push({
      fun: this.funAttribute
    })
  }
  deleteActValue(index) {
    this.actObject.splice(index, 1);
  }
  addActValue() {
    this.actObject.push({
      act: this.actAttribute
    })
  }
  deleteFieldValueJ(index) {
    this.fieldObjectJ.splice(index, 1);
  }
  addFieldValueJ() {
    this.fieldObjectJ.push({
      ju: this.jusAttribute
    })
  }
  deleteFieldValueDocs(index) {
    this.docsObject.splice(index, 1);
  }
  addFieldValueDocs() {
    this.docsObject.push({
      doc: this.docsAttribute
    })

    console.log(this.docsObject);
  }

  onSubmit() {
    console.log(this.tdrForm.value);
    var resFinal = []
    var funFinal = []
    var actFinal = []
    var cursoFinal = []
    var jusFinal = []
    var docFinal = []

    for (let i in this.docsObject) {
      docFinal.push(this.docsObject[i].doc)
    }

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
    console.log(cursoFinal2.join(','));

    for (let i in this.resObject) {
      resFinal.push(this.resObject[i].re)
    }
    for (let i in this.funObject) {
      funFinal.push(this.funObject[i].fu)
    }
    for (let i in this.actObject) {
      actFinal.push(this.actObject[i].ac)
    }
    for (let i in this.fieldObjectJ) {
      jusFinal.push(this.fieldObjectJ[i].ju)
    }

    this.tdrForm.value.documentos_presentar = docFinal.join(';')
    this.tdrForm.value.resultados_esperados = resFinal.join(';')
    this.tdrForm.value.funciones = funFinal.join(';')
    this.tdrForm.value.justificacion = jusFinal.join(';')
    this.tdrForm.value.actividades = actFinal.join(';')
    this.tdrForm.value.expgen_anio = this.expgen_anio
    this.tdrForm.value.expgen_mes = this.expgen_mes
    this.tdrForm.value.expesp_anio = this.expesp_anio
    this.tdrForm.value.expesp_mes = this.expesp_mes
    this.tdrForm.value.perfil_cursos_req = cursoFinal2.join(';');
    this.tdrForm.value.sueldo_total = (this.resCalculo).toString();

    console.log(this.tdrForm.value);

    this._unidadSolicitanteService.putTdr(this.tdrForm.value, this.id).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Formulario TDR actualizado correctamente.',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        this.router.navigate([`/formulario-listado`]);
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
    // cambio fechas 
    var b = moment(this.initialDate, "YYYY.MM.DD");
    console.log(b);
    var futureMonth = moment(b).add(this.tdrForm.value.dias_contrato, 'days').add(this.tdrForm.value.meses_contrato, 'months');
    this.formatFutureDate = moment(futureMonth['_d']).format("YYYY-MM-DD");

    console.log(this.formatFutureDate);


    // Calculo del sueldo
    //const find = this.cuadroEqu.filter(el => el.id_cuadro_equivalencia == this.denominacionP)
    const find = this.cuadroEqu.filter(el => el.id_cuadro == this.tdrForm.value.id_cuadro_equivalencia)
    this.expgen_anio = find[0].expgen_anio;
    this.expgen_mes = find[0].expgen_mes;
    this.expesp_anio = find[0].expesp_anio;
    this.expesp_mes = find[0].expesp_mes;

    console.log(find);
    // se multiplica el sueldo del espcialista por los meses y se resta por un dia / Cualquier mes equivale a 30 dias, se resta un dia 
    const sueldoDiario = find[0].sueldo / 30;
    const resultadoMeses = this.tdrForm.value.meses_contrato * find[0].sueldo;
    const resultadoDias = (this.tdrForm.value.dias_contrato * sueldoDiario);
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
  }

}

