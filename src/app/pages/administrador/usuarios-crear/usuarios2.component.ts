import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';

import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-usuarios2',
  templateUrl: './usuarios2.component.html',
  styleUrls: ['./usuarios2.component.css']
})
export class Usuarios2Component implements OnInit {
  formularioForm: FormGroup;

  activo: number;
  direcciones: object;
  grupos: object;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _unidadSolicitanteService: UnidadSolicitanteService
  ) { }

  ngOnInit(): void {
    this._unidadSolicitanteService.getDireccion().subscribe(res => {
      console.log(res);
      this.direcciones = res;

    })

    this._unidadSolicitanteService.getGrupo().subscribe(res => {
      this.grupos = res;
    })

    this.formularioForm = this.formBuilder.group({
      nombres: ["", Validators.required],
      apellido_paterno: ["", Validators.required],
      apellido_materno: ["", Validators.required],
      numero_documento: ["", Validators.required],
      tipo_documento: ["", Validators.required],
      correo: ["", Validators.required],
      login: ["", Validators.required],
      password: ["", Validators.required],
      id_direccion: ["", Validators.required],
      id_grupo: ["", Validators.required],
      dep_trabajo: ["", Validators.required]
    });
  }

  onSubmit() {
    // Verfica si existe un nombre de login similar en la bd
    var login = {
      "login": this.formularioForm.value.login
    }
    this._unidadSolicitanteService.getUsername(login).subscribe(res => {
      console.log(res);
      if (res['datos']) {
        //this.formularioForm2.reset()
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Existe un nombre de usuario similar.',
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        this._unidadSolicitanteService.postPersonUser(this.formularioForm.value).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Usuario registrado correctamente.',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(() => {
            this.router.navigate(['/usuarios/listado'])
          }, 3000)
        }, (err) => {
          console.log(err.error);
          for (let i in err.error.errors) {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: `${err.error.errors[i].msg}`,
            })
          }
        })
      }
    })
  }

}