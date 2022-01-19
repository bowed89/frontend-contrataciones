import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.css']
})
export class UsuariosEditarComponent implements OnInit {
  login: string;
  password: string;
  correo: string;
  direcciones: object;
  id_direccion: string;
  grupos: object;
  id_grupo: string;
  dep_trabajo: string;
  nombres: string; //
  apellido_paterno: string;
  apellido_materno: string;
  numero_documento: any;
  tipo_documento: number;

  idPersona: number;
  idUsuario: number;
  aux_login: string;

  constructor(
    private activatedRoute: ActivatedRoute,
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

    this.activatedRoute.params.subscribe(param => {
      this.idPersona = param['id'];
      this.idUsuario = param['id2'];

      this._unidadSolicitanteService.getPersona(this.idPersona).subscribe(res => {
        console.log(res);
        this.correo = res[0].correo;
        this.nombres = res[0].nombres;
        this.apellido_paterno = res[0].apellido_paterno;
        this.apellido_materno = res[0].apellido_materno;
        this.numero_documento = res[0].numero_documento;
        this.tipo_documento = res[0].tipo_documento;
      })
      this._unidadSolicitanteService.getUsuario(this.idUsuario).subscribe(res2 => {
        console.log(res2);
        this.login = res2[0].login;
        this.aux_login = res2[0].login;
        this.password = res2[0].password;
        this.id_direccion = res2[0].id_direccion
        this.id_grupo = res2[0].id_grupo
        this.dep_trabajo = res2[0].dep_trabajo

        console.log("this.login ", this.login);
      })
    })
  }

  onSubmit() {
    var getUsuario = {
      login: this.login,
      password: this.password,
      id_direccion: this.id_direccion,
      id_grupo: this.id_grupo,
      usucre: 1,
      dep_trabajo: this.dep_trabajo
    }
    var getPersona = {
      nombres: this.nombres,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      correo: this.correo,
      numero_documento: this.numero_documento,
      tipo_documento: this.tipo_documento
    }
    console.log('aux_login', this.aux_login);
    console.log('login', this.login);
    console.log(getUsuario);
    console.log(getPersona);

    var login = {
      login: this.login
    }
    this._unidadSolicitanteService.getUsername(login).subscribe(res => {
      console.log(res);
      if (Object.keys(res).length == 0) {
        console.log('vacio hace update');
        this.updateForm(getUsuario, getPersona);
      } else {
        if (this.aux_login == res['datos']['login']) {
          console.log('mismo nom de usuario no pasa nada hace update');
          this.updateForm(getUsuario, getPersona);
        } else {
          if (this.login == res['datos']['login']) {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Intente con otro "Nombre de Usuario"',
              showConfirmButton: false,
              timer: 3000
            })
            console.log('no hace update');
          }
        }
      }
    })
  }

  updateForm(getUsuario: object, getPersona: object) {
    // actualizar seg_usuario
    this._unidadSolicitanteService.putUser(getUsuario, this.idUsuario).subscribe(res1 => {
      console.log(res1);
      // actualizar seg_persona
      this._unidadSolicitanteService.putUser2(getPersona, this.idPersona).subscribe(res2 => {
        console.log(res2);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Usuarios actualizados correctamente.',
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
    }, (err) => {
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
