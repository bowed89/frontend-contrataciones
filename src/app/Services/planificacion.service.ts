import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {

  constructor(
    public http: HttpClient
  ) {}

  getFuc() {
    return this.http.get(`${URL_SERVICIOS}/api/fuc`);
  }
  getDireccionUser(id: number) {
    return this.http.get(`${URL_SERVICIOS}/api/fuc/direccion-user/${id}`); 
  }
  postReqPoa(body: object): Observable<object> {
    return this.http.post(`${URL_SERVICIOS}/api/fuc/add`, body);
  }
    
  getPoaId(id: number): Observable<object> {
    return this.http.get(`${URL_SERVICIOS}/api/fuc/getPoa/${id}`);
  }

  findIdFucinPoa(id: string) {
    return this.http.get(`${URL_SERVICIOS}/api/fuc/buscar-id-fuc-poa/${id}`);
  }

  putPoa(body: object, id: number): Observable<object> {
    return this.http.put(`${URL_SERVICIOS}/api/fuc/putPoa/${id}`, body);
  }

}
