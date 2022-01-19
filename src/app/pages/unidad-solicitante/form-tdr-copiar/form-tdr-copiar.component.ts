import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-form-tdr-editar',
  templateUrl: './form-tdr-copiar.component.html',
  styleUrls: ['./form-tdr-copiar.component.css']
})
export class FormTdrCopiarComponent implements OnInit {

  res: object = {};
  meses_contrato: string;
  resCalculo: number;

  resArray: Array<any> = [];
  resAttribute: any;
  resObject: Array<any> = [];

  funArray: Array<any> = [];
  funAttribute: any;
  funObject: Array<any> = [];

  actArray: Array<any> = [];
  actAttribute: any;
  actObject: Array<any> = [];

  docsArray: Array<any> = [];
  docsAttribute: any;
  docsObject: Array<any> = [];

  jusArray: Array<any> = [];
  jusAttribute: any;
  fieldObjectJ: Array<any> = [];

  fieldArray3: Array<any> = [];
  newAttribute3: any;
  selectCurso: Array<any> = [];
  cursoObject: Array<any> = []

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
  id_convocatoria: number;

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
      objetivo_cons: ["", Validators.required],
      created_at: ["", Validators.required],
      sede_trabajo: ["", Validators.required],
      area: [""],
      lugar_horario: [""],
      supervision_dep: [""],
      honorarios_me: [""],
      
    });
  }

  ngOnInit(): void {
    var disabled = moment();
    this.disableDate = moment(disabled['_d']).format("YYYY-MM-DD");
    console.log('ssss', this.disableDate)

    this.activatedRoute.params.subscribe(param => {
      var arrayCursos = []
      this.id = param['id']
      this._unidadSolicitanteService.getTdrId(this.id).subscribe(resp => {
        var split = (resp[0].perfil_cursos_req).split(';')
        for (let i in split) {
          var split22 = (split[i]).split('(')
          split22[1] = "(" + split22[1]
          arrayCursos.push(split22)
        }
        this.res = resp;
        this.id_convocatoria = this.res[0].id_convocatoria;
        console.log(resp);

        this.inputMonth = this.res[0].meses_contrato
        this.inputDay = this.res[0].dias_contrato

        this._unidadSolicitanteService.getCuadroE().subscribe(res => {
          this.cuadroEqu = res;
          this.cambioFechas()
        })
        this._unidadSolicitanteService.getProyecto().subscribe(res => {
          this.proyectos = res;
        })

        //llena en los inputs de res, actividades, funciones los datos y lo transforma en array
        //  this.resArray = (this.res[0].resultados_esperados).split(',');
        this.funArray = (this.res[0].funciones).split(';');
        this.actArray = (this.res[0].actividades).split(';');
        this.jusArray = (this.res[0].justificacion).split(';');
        this.docsArray = (this.res[0].documentos_presentar).split(';');

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

        for (let i in this.resArray) {
          this.resObject.push({
            re: this.resArray[i]
          })
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
        for (let i in this.docsArray) {
          this.docsObject.push({
            doc: this.docsArray[i]
          })
          console.log(this.docsObject);
        }
        for (let i in this.jusArray) {
          this.fieldObjectJ.push({
            ju: this.jusArray[i]
          })
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

        this.tdrForm.patchValue({
          id_cuadro_equivalencia: this.tdrForm.value.id_cuadro_equivalencia,
          id_proyecto: this.res[0].id_proyecto,
          id_gestion: 1,
          id_usuarios: parseInt(localStorage.getItem('id_usuario')),
          objeto_contratacion: this.res[0].objeto_contratacion,
          fecha_inicio: this.fechaInicio,
          usuario: ["1"],
          antecedentes: this.res[0].antecedentes,
          justificacion: this.res[0].justificacion,
          objetivo_consultoria: this.res[0].objetivo_consultoria,
          perfil_formacion_min: this.res[0].perfil_formacion_min,
          perfil_cursos_req: this.res[0].perfil_cursos_req,
          perfil_exp_gral: this.res[0].perfil_exp_gral,
          perfil_exp_esp: this.res[0].perfil_exp_esp,
          documentos_presentar: this.res[0].documentos_presentar,
          modalidad_contratacion: this.res[0].modalidad_contratacion,
          funciones: this.res[0].funciones,
          actividades: this.res[0].actividades,
          created_at: formatDate(current),
          lugar_horario: this.res[0].lugar_horario,
          supervision_dep: this.res[0].supervision_dep,
          honorarios_me: this.res[0].honorarios_me,
        })
      })
    })
  }

  /* Borrar y agregar campos del input dinamico  */
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
  addCursoValue() {
    this.cursoObject.push({
      cu: this.newAttribute3
    })
  }
  deleteCursoValue(index) {
    this.cursoObject.splice(index, 1)//delete input
    this.selectCurso.splice(index, 1);//delete select
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
  }

  onSubmit() {
    var resFinal = []
    var funFinal = []
    var actFinal = []
    var cursoFinal = []
    var jusFinal = []

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
    // this.tdrForm.value.resultados_esperados = resFinal.join()
    this.tdrForm.value.funciones = funFinal.join(';')
    this.tdrForm.value.justificacion = jusFinal.join(';')
    this.tdrForm.value.actividades = actFinal.join(';')
    this.tdrForm.value.expgen_anio = this.expgen_anio
    this.tdrForm.value.expgen_mes = this.expgen_mes
    this.tdrForm.value.expesp_anio = this.expesp_anio
    this.tdrForm.value.expesp_mes = this.expesp_mes
    this.tdrForm.value.id_tdr_principal = this.id
    this.tdrForm.value.meses_contrato = this.inputMonth;
    this.tdrForm.value.dias_contrato = this.inputDay;
    this.tdrForm.value.perfil_cursos_req = cursoFinal2.join(';');
    this.tdrForm.value.id_dep = this.id;
    this.tdrForm.value.sueldo_total = (this.resCalculo).toString();
    this.tdrForm.value.id_convocatoria = this.id_convocatoria

    console.log(this.tdrForm.value);

     this._unidadSolicitanteService.postTdr(this.tdrForm.value).subscribe(res => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Formulario TDR copiado correctamente.',
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
    var b = moment(this.initialDate, "YYYY.MM.DD");
    var futureMonth = moment(b).add(this.inputDay, 'days').add(this.inputMonth, 'months');
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
    const resultadoMeses = this.inputMonth * find[0].sueldo;
    const resultadoDias = (this.inputDay * sueldoDiario);
    this.resCalculo = Math.round(((resultadoDias + resultadoMeses) - sueldoDiario) * 100) / 100

    console.log('meses ganado:', resultadoMeses);
    console.log('dias ganado:', resultadoDias);
    console.log('total ganado:', this.resCalculo);

    //llenando automatico el select "Modalidad contratación"
    if (this.resCalculo <= 50000) {
      this.tdrForm.controls['modalidad_contratacion'].setValue("1");

    }
    if (this.resCalculo > 50000 && this.resCalculo <= 200000) {
      this.tdrForm.controls['modalidad_contratacion'].setValue("2");

    }
    if (this.resCalculo > 200000 && this.resCalculo <= 1000000) {
      this.tdrForm.controls['modalidad_contratacion'].setValue("3");

    }
    if (this.resCalculo > 1000000) {
      this.tdrForm.controls['modalidad_contratacion'].setValue("4");
    }
  }

}

