import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RrhhService {

  constructor(
    public http: HttpClient
  ) { }
  getFucRrhh() {
    return this.http.get(`${URL_SERVICIOS}/api/fuc/getFucRrhh`);
  }

  putTdr(body: object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/rrhh/update-fuc/${id}`, body);
  }

  getPostulantedeFuc (id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/rrhh/get-postulante-fuc/${id}`);
  }
}
