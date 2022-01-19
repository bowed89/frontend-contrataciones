import { Component, OnInit } from '@angular/core';
import { CredencialService } from 'src/app/Services/credencial.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-credenciales-listado',
  templateUrl: './credenciales-listado.component.html',
  styleUrls: ['./credenciales-listado.component.css']
})
export class CredencialesListadoComponent implements OnInit {
  cols: any[];
  terminoRef: any;
  seleccionar: Array<any> = [];

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(
    private _credencialService: CredencialService,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    let array = [];
    // nombres de columnas de las tablas
    this.cols = [
      { field: 'cargo', header: 'CARGO' },
      { field: 'nombres', header: 'NOMBRE' },
      { field: '', header: 'OPCIONES' },
      { field: '', header: 'SELECCIONAR' },
    ];
    this._credencialService.getAllContrato().subscribe(res => {
      console.log(res);
      for (let i in res) {
        array.push({
          apellido_materno: res[i].apellido_materno,
          apellido_paterno: res[i].apellido_paterno,
          cargo: res[i].cargo,
          nombres: res[i].nombres,
          numero_documento: res[i].numero_documento,
          objeto_contratacion: res[i].objeto_contratacion,
          qr: res[i].qr,
          sede_trabajo: res[i].sede_trabajo,
          tipo_documento: res[i].tipo_documento,
          extension_documento: res[i].extension_documento,
          sigla: res[i].sigla
        })
      }
      //this.terminoRef = res;
      this.terminoRef = array;
    })

  }
  check(result, checkFlag) {
    if (checkFlag) {
      this.seleccionar.push(result);
    } else {
      console.log('no seleccionado', this.seleccionar.indexOf(result));
      this.seleccionar.splice(this.seleccionar.indexOf(result), 1);
    }
    console.log('objecto ===> ', this.seleccionar);
    this._credencialService.getAllSelected = this.seleccionar;
  }

  all(checkFlag) {
    this.terminoRef.forEach(item => item.selected = checkFlag)
    if (checkFlag) {
      for (let i in this.terminoRef) {
        this.seleccionar.push(this.terminoRef[i])
      }
      console.log('select all ->', this.seleccionar)
      this._credencialService.getAllSelected = this.seleccionar;
    } else {
      this.seleccionar = []
      console.log('select all ->', this.seleccionar);
      this._credencialService.getAllSelected = this.seleccionar;
    }
  }
}
