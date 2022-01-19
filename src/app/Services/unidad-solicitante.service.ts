import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadSolicitanteService {
  copiarValoresTdr: object;
  token: string;

  // direccion: any;
  // sigla: any;


  id: any;

  
  constructor(
    public http: HttpClient
  ) { 
    this.token = localStorage.getItem('token');
  }

  getTdr() {
    //const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(`${URL_SERVICIOS}/api/tdr`);
  }

  getPreTdr() {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/getPreTdr`);
  }

  getPreTdrById(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/getPreTdrById/${id}`);
  }

  getDireccion() {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/direccion`);
  }


  postTdr(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/tdr/add`, body);
  }

  postTdrPre(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/tdr/add-pre`, body);
  }
  
  getTdrId(id: number): Observable<object> {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/${id}`);
  }
  
  putTdr(body: any, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/tdr/put/${id}`, body);
  }

  putTdrPre(body: any, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/tdr/putTdrPre/${id}`, body);
  }

  getPostulantes(id: number): Observable<object>{
    return this.http.get(`${URL_SERVICIOS}/api/tdr/postulantes/${id}`);
  }
  postFuc(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/tdr/add/fuc`, body);
  }
  getFucId(id: number): Observable<object> {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/getfuc/${id}`);
  }
  getProyectoId(id: number): Observable<object> {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/proyecto/${id}`);
  }
  getCuadroE(){
    return this.http.get(`${URL_SERVICIOS}/api/tdr/cuadro-equivalencia`);
  }
  getProyecto() {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/proyecto`);
  }
  findIdTdrinFuc(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/buscar-id-tdr-fuc/${id}`);
  }
  findIdConvInTdr(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/findIdConvInTdr/${id}`);
  }
  getFucByIdTdr(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/fuc/getFucByIdTdr/${id}`);
  }
  getDatasForFucById(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/fuc/getDatasForFucById/${id}`);
  }

  getGrupo() {
    return this.http.get(`${URL_SERVICIOS}/api/usuarios/getGrupo`);
  }
  postPersonUser(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/postPersonUser`, body);
  }
  getNumeroDoc(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/getNumeroDocumento`, body);
  }
  getUsername(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/getUsername`, body);
  }
  getPostulantes2(id: number): Observable<object> {
    return this.http.get(`${URL_SERVICIOS}/api/tdr/getPostulantes/${id}`);
  }
  getListado() {
    return this.http.get(`${URL_SERVICIOS}/api/usuarios/getListado`);
  }
  getUsuario(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usuarios/getUsuario/${id}`);
  }
  getPersona(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usuarios/getPersona/${id}`);
  }
  getUserById(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usuarios/getUserById/${id}`);
  }
  putUser(object: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/usuarios/putUser/${id}`, object);
  }
  putUser2(object: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/usuarios/putUser2/${id}`, object);
  }
  putUser3(object: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/usuarios/putUser3/${id}`, object);
  }
  putCorrelativo(object: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/tdr/putCorrelativo/${id}`, object);
  }

  //Victor
  postDireccion(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/tdr/postDireccion`, body);
  }

  postDirecciones(body: any): Observable<any> {
    return this.http.post(`${URL_SERVICIOS}/api/tdr/postDirecciones`, body);
  }

  putDirecciones(body: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/tdr/putDirecciones/${id}`, body);
  }



}
