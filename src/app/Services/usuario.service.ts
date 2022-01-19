import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';

const base_url = environment.base_url;


declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: any;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

    //this.googleInit();
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "token": localStorage.getItem('token')
  })

  get token(): string {
    return localStorage.getItem('token');
  }

  get uid(): number {
    return this.usuario.id_usuario;
  }

  guardarLocalStorage(token: string, id_usuario: any, login: any, id_grupo: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    localStorage.setItem('id_grupo', id_grupo);
    localStorage.setItem('id_usuario', id_usuario);
  }

  logout() {

    localStorage.clear();

    // this.router.navigateByUrl('/login');

    /*this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });*/

  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${URL_SERVICIOS}/api/login-contrataciones/renew`, {
      headers: {
        'token': this.token
      }
    }).pipe(
      map((resp: any) => {
        console.log(resp);
        const { login, id_grupo, id_usuario } = resp.usuario;
        this.usuario = { login, id_grupo, id_usuario };
        this.guardarLocalStorage(resp.token, resp.usuario.id_usuario, resp.usuario.login, resp.usuario.id_grupo)
        return true;
      }),
      catchError(error => of(false))
    );
  }


  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/login/signup`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu, resp.usuario.login, resp.usuario.id_rol);
        })
      )
  }

  actualizarPerfil(data: { nombre: string, login: string, id_rol: number }) {

    data = {
      ...data,
      id_rol: this.usuario.id_rol
    }

    return this.http.put(`${base_url}/creacion/usuarios/${this.uid}`, data, {
      headers: {
        'token': this.token
      }
    });

  }


  actualizarPass(data: { password: string }) {
    return this.http.put(`${base_url}/creacion/actualizarPass/${this.uid}`, data, {
      headers: {
        'token': this.token
      }
    });
  }

  login(formData: object) {
    return this.http.post(`${URL_SERVICIOS}/api/login-contrataciones/signin`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.res.id_usuario, resp.res.login, resp.res.id_grupo)
        })
      );

  }

  readDepartamento() {
    return this.http.get(`${base_url}/creacion/departamento`);
  }

  readReporte(id: number) {
    return this.http.get(`${base_url}/monitoreo/reporteSupervision/${id}`);
  }

  readDepartamentoAsignado(id: number) {
    return this.http.get(`${base_url}/creacion/departamentoAsignado/${id}`);
  }

  readObservacion(id: number, ob: number) {
    return this.http.get(`${base_url}/monitoreo/robservacion/${id}/${ob}`);
  }

  readRol() {
    return this.http.get(`${base_url}/creacion/rol`);
  }

  readRolCodificacion() {
    return this.http.get(`${base_url}/creacion/readRolCodificacion`);
  }

  readUsuarios() {
    return this.http.get(`${base_url}/creacion/usuarios`);
  }

  readUsuariosDep(id: number, ro: number) {
    return this.http.get(`${base_url}/creacion/usuarios/${id}/${ro}`, {
      headers: {
        'token': this.token
      }
    });
  }

  createUsuarios(usuario: Usuario) {
    return this.http.post(`${base_url}/creacion/usuarios`, usuario);
  }

  updateUsuarios(usuario: Usuario) {
    return this.http.put<Usuario>(`${base_url}/creacion/usuarios`, usuario);
  }

  deleteUsuarios(id: number) {
    return this.http.delete(`${base_url}/creacion/usuarios/${id}`);
  }

  readUpm(id: number) {
    return this.http.get(`${base_url}/monitoreo/buscaUpm/${id}`);
  }


  incluir() {
    return this.http.get(`${base_url}/monitoreo/incluir`);
  }

  buscaCodigo(form) {
    return this.http.post(`${base_url}/monitoreo/buscaFolio`, form);
  }


  getUsuarioLogin(body: object): Observable<any> {
    return this.http.post(`${base_url}/usuarios/getUsuarioLogin`, body);
  }

}
