import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsaService } from 'src/app/Services/usa.service';

@Component({
  selector: 'app-form-poa-experiencia',
  templateUrl: './form-poa-experiencia.component.html',
  styleUrls: ['./form-poa-experiencia.component.css']
})
export class FormPoaExperienciaComponent implements OnInit {
  id: number;

  getCursoSeminario: object;
  cursoSeminarioFlag: boolean = false;

  getCursoSeminarioEsp: object;
  cursoSeminarioEsFlag: boolean = false;

  getExperiencia: object;
  experienciaFlag: boolean = false;

  getExperienciaEs: object;
  experienciaEsFlag: boolean = false;
  
  getExperienciaGral: object;
  experienciaGralFlag: boolean = false;

  getFormacion: object;
  formacionFlag: boolean = false;

  getIdioma: object;
  idiomaFlag: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private _usaService: UsaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      console.log(this.id);
      this._usaService.getCursoSeminario(this.id).subscribe(res => {
        this.getCursoSeminario = res;
        if (Object.keys( this.getCursoSeminario).length > 0) {
          this.cursoSeminarioFlag = true;
        }
      })
      this._usaService.getCursoSeminarioEsp(this.id).subscribe(res => {
        console.log( this.cursoSeminarioEsFlag);
        this.getCursoSeminarioEsp = res;
        if (Object.keys( this.getCursoSeminarioEsp).length > 0) {
          this.cursoSeminarioEsFlag = true;
        }
      })
      this._usaService.getExperiencia(this.id).subscribe(res => {
        this.getExperiencia = res;
        if (Object.keys( this.getExperiencia).length > 0) {
          this.experienciaFlag = true;
        }
      })
      this._usaService.getExperienciaEsp(this.id).subscribe(res => {
        this.getExperienciaEs = res;
        if (Object.keys( this.getExperienciaEs).length > 0) {
          this.experienciaEsFlag = true;
        }
      })
      this._usaService.getExperienciaGral(this.id).subscribe(res => {
        this.getExperienciaGral = res;
        if (Object.keys( this.getExperienciaGral).length > 0) {
          this.experienciaGralFlag = true;
        }
      })
      this._usaService.getFormacionAc(this.id).subscribe(res => {
        this.getFormacion = res;
        if (Object.keys( this.getFormacion).length > 0) {
          this.formacionFlag = true;
        }
      })
      this._usaService.getIdiomas(this.id).subscribe(res => {
        this.getIdioma = res;
        if (Object.keys( this.getIdioma).length > 0) {
          this.idiomaFlag = true;
        }
      })

    })
  }

}
