import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  arrayNota: Array<any> = [];
  hr: string;
  informe: object;

  constructor(
    public http: HttpClient
  ) { }

  getAllNota() {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/getAllNotaAdj`);
  }
  getNotaById(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/getNotaById/${id}`);
  }

  putCuadroEq(object: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/usa/putCuadroEq/${id}`, object);
  }
  postCuadroEq(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usa/postCuadroEq`, object);
  }
  postContrato(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/asesoria/postContrato`, object);
  }
  postInformeLegal(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/asesoria/postInformeLegal`, object);
  }
  findIdFucInContrato(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/findIdFucInContrato/${id}`);
  }
  findIdFucInInforme(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/findIdFucInInforme/${id}`);
  }
  getFucTableInforme(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/getFucTableInforme/${id}`);
  }
  getInformeById(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/getInformeById/${id}`);
  }
  getInformeId(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/getInformeId/${id}`);
  }
  getNotaByQr(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/asesoria/getNotaByQr/${id}`);
  }
  putInformeLegal(object: Object, id: string): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/asesoria/putInformeLegal/${id}`, object);
  }

}
