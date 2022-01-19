import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsaService } from 'src/app/Services/usa.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nota-editar',
  templateUrl: './nota-editar.component.html',
  styleUrls: ['./nota-editar.component.css']
})
export class NotaEditarComponent implements OnInit {
  hrInput: string;
  citeInput: string;
  cil: string;
  docsObject: Array<any> = [];
  docsArray: Array<any> = [];
  docsAttribute: any;
  idNota: number;

  constructor(
    private _usaService: UsaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.idNota = param['id'];
      this._usaService.getNotaById(this.idNota).subscribe(res => {
        console.log(res);
        this.docsArray = (res[0].documentos_presentar).split(';');
        this.hrInput = res[0].hr;
        this.citeInput = res[0].cite
        this.cil = res[0].cil

        console.log(this.docsArray);
        for (let i in this.docsArray) {
          this.docsObject.push({
            docs: this.docsArray[i]
          })
        }
      })
    })
  }
  addFieldValueDocs() {
    this.docsObject.push({
      docs: this.docsAttribute
    })
  }
  deleteFieldValueDocs(index) {
    this.docsObject.splice(index, 1);
  }

  onSubmit() {
    var docsFinal = [];

    for (let i in this.docsObject) {
      docsFinal.push(this.docsObject[i].docs)
    }
    let object = {
      documentos_presentar: docsFinal.join(';'),
      hr: this.hrInput,
      cite: this.citeInput,
      cil: this.cil
    }
    console.log(object);
    this._usaService.putNotaAdjudicacion(object, this.idNota).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Nota de Adjudicación actualizado correctamente.',
        showConfirmButton: false,
        timer: 3000
      })
      this.router.navigate(['/revision-postulante', this.idNota])
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
