import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsaService {

  arrayNota: Array<any> = [];
  hr: string;

  constructor(
    public http: HttpClient
  ) { }

  getPoa() {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getPoa`);
  }
  getReqPoa(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getReqPoa/${id}`);
  }

  getMenu(id: any): Observable<any> {
    return this.http.post(`${URL_SERVICIOS}/api/usa/getMenu`, id);
  }
  getMenuAll(): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getMenuAll`);
  }

  /* Obtener hoja de vida */
  getCursoSeminario(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getCursoSeminario/${id}`);
  }
  getCursoSeminarioEsp(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getCursoSeminarioEsp/${id}`);
  }
  getExperiencia(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getExperiencia/${id}`);
  }
  getExperienciaEsp(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getExperienciaEsp/${id}`);
  }
  getExperienciaGral(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getExperienciaGral/${id}`);
  }
  getFormacionAc(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getFormacionAc/${id}`);
  }
  getIdiomas(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getIdiomas/${id}`);
  }
  getCuadroEq() {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getCuadroEq`);
  }
  getCuadroId(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getCuadroId/${id}`);
  }
  putCuadroEq(object: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/usa/putCuadroEq/${id}`, object);
  }
  postCuadroEq(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usa/postCuadroEq`, object);
  }
  postNotaAdjudicacion(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usa/postNotaAdjudicacion`, object);
  }
  findIdFucInNotaAd(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/findIdFucInNotaAd/${id}`);
  }
  getNotaById(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getNotaById/${id}`);
  }
  getIdNotaByIdFuc(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/usa/getIdNotaByIdFuc/${id}`);
  }
  getpdf(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/pdf`, object);
  }
  getpdfEH2021(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/pdfEH2021`, object);
  }
  pdfSupervisorEH2021(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/pdfSupervisorEH2021`, object);
  }
  getpdfContrato(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/pdfContrato`, object); 
  }
  pdfAuxEH2021(object: Object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/usuarios/pdfAuxEH2021`, object);
  }
  putNotaAdjudicacion(object: Object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/usa/putNotaAdjudicacion/${id}`, object);
  }
}
