import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Observable } from 'rxjs';
import { map } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CredencialService {
  getAllSelected: any;
  getChangeSelected: any;

  constructor(
    public http: HttpClient
  ) { }

  getAllContrato() {
    return this.http.get(`${URL_SERVICIOS}/api/credencial`);
  }
  getAllCredencial() {
    return this.http.get(`${URL_SERVICIOS}/api/credencial/getAllCredencial`);
  }
  subirImagen(file: any): Observable<any> {
    return this.http.post(`${URL_SERVICIOS}/api/upload/fileupload`, file);
  }

  mostrarImagen(name: string): Observable<Blob> {
    return this.http.get(`${URL_SERVICIOS}/api/upload/images/${name}`, { responseType: 'blob' });
  }
 
  guardarCredencial2(body: object): Observable<any> {
    return this.http.post(`${URL_SERVICIOS}/api/credencial/postCredencial2`, body);
  }

  actualizarFoto2(body: object): Observable<any> {
    return this.http.put(`${URL_SERVICIOS}/api/credencial/putCredencial2`, body);
  }

}
