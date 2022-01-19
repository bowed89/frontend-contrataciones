import { Component, OnInit } from '@angular/core';
import { CredencialService } from 'src/app/Services/credencial.service';
import * as moment from 'moment';

@Component({
  selector: 'app-credenciales-seleccionados',
  templateUrl: './credenciales-seleccionados.component.html',
  styleUrls: ['./credenciales-seleccionados.component.css']
})
export class CredencialesSeleccionadosComponent implements OnInit {
  cols: any[];
  terminoRef: any;
  imgURL: string | ArrayBuffer;
  formData = new FormData();

  count1: number = 0;
  count2: number = 0;

  arrayIndex: Array<any> = [];
  disabledBtn: boolean = false;

  arrayUpdate: Array<any> = [];
  ej = new Map();

  getAllCredencial: object;

  constructor(
    private _credencialService: CredencialService,
  ) { }

  ngOnInit(): void {
    this._credencialService.getAllCredencial().subscribe(res => {
      this.getAllCredencial = res;
      // nombres de columnas de las tablas
      this.cols = [
        { field: 'cargo', header: 'CARGO' },
        { field: 'nombres', header: 'NOMBRE' },
        { field: '', header: 'SUBIR FOTO DEL FUNCIONARIO' },
        { field: '', header: 'EDITAR FOTO' }
      ];
      this.terminoRef = this._credencialService.getAllSelected;
      let totalLength = Object.keys(this.terminoRef).length

      // verificar si existe registrado un dato en this.terminoRef desde this.getAllCredencial
      for (let i in this.terminoRef) {
        for (let j in this.getAllCredencial) {
          if (this.terminoRef[i].apellido_materno == this.getAllCredencial[j].apellido_materno
            && this.terminoRef[i].apellido_paterno == this.getAllCredencial[j].apellido_paterno
            && this.terminoRef[i].cargo == this.getAllCredencial[j].cargo
            && this.terminoRef[i].objeto_contratacion == this.getAllCredencial[j].objeto_contratacion
            && this.terminoRef[i].numero_documento == this.getAllCredencial[j].numero_documento
          ) {
            // llama al servicio para mostrar img en blob
            this._credencialService.mostrarImagen(this.getAllCredencial[j].img).subscribe(resp => {
              this.terminoRef[i] = {
                id_credencial: this.getAllCredencial[j].id_credencial,
                apellido_materno: this.terminoRef[i].apellido_materno,
                apellido_paterno: this.terminoRef[i].apellido_paterno,
                cargo: this.terminoRef[i].cargo,
                nombres: this.terminoRef[i].nombres,
                numero_documento: this.terminoRef[i].numero_documento,
                objeto_contratacion: this.terminoRef[i].objeto_contratacion,
                qr: this.terminoRef[i].qr,
                sede_trabajo: this.terminoRef[i].sede_trabajo,
                tipo_documento: this.terminoRef[i].tipo_documento,
                imgPath: URL.createObjectURL(resp),
                img: this.getAllCredencial[j].img,
                created_at: moment().format("DD-MM-YYYY"),
                usuario: localStorage.getItem('id_usuario'),
                extension_documento: this.terminoRef[i].extension_documento,
                sigla: this.terminoRef[i].sigla
              }
            })
            this.count1++;// contador para ver cuantas imgs existen almacenadas previamente en la bd
          }
        }
      }
      console.log('this.terminoRef nuevo -->', this.terminoRef);
      // habilita btn cuando todos los usuarios tienen imgs cargadas...
      console.log(this.count1);
      if (this.count1 === totalLength) {
        this.disabledBtn = true;
      }
    })
  }

  preview(files: FileList, index) {
    // proceso para deshabilitar btn GENERAR CREDENCIALES
    let totalLength = Object.keys(this.terminoRef).length
    this.count2++;
    let countTotalImg = this.count1 + this.count2;
    console.log(countTotalImg);
    console.log(totalLength);
    if (countTotalImg === totalLength) {
      this.disabledBtn = true;
    }
    console.log(this.disabledBtn);

    this.formData.delete('photo');
    this.formData.append('photo', files[0]);
    this._credencialService.subirImagen(this.formData).subscribe(res => {
      console.log(res);
      this._credencialService.mostrarImagen(res.response.photo.name).subscribe(resp => {
        let imgBlob = resp
        this.terminoRef[index] = {
          nombres: this.terminoRef[index].nombres,
          apellido_paterno: this.terminoRef[index].apellido_paterno,
          apellido_materno: this.terminoRef[index].apellido_materno,
          cargo: this.terminoRef[index].cargo,
          numero_documento: this.terminoRef[index].numero_documento,
          extension_documento: this.terminoRef[index].extension_documento,
          objeto_contratacion: this.terminoRef[index].objeto_contratacion,
          qr: this.terminoRef[index].qr,
          sede_trabajo: this.terminoRef[index].sede_trabajo,
          img: res.response.photo.name,
          usuario: localStorage.getItem('id_usuario'),
          created_at: moment().format("DD-MM-YYYY"),
          imgPath: URL.createObjectURL(imgBlob)
        }
        console.log('this.terminoRef[index]', this.terminoRef[index]);

        this._credencialService.guardarCredencial2(this.terminoRef[index]).subscribe(res => {
          console.log(res);
        })
      }, (err) => {
        console.log(err);
      })
    })
  }

  // Actualizar foto
  previewUpdate2(files: FileList, i) {
    this.formData.delete('photo');
    this.formData.append('photo', files[0]);
    console.log(this.formData);
    this._credencialService.subirImagen(this.formData).subscribe(res => {
      console.log(res);
      this._credencialService.mostrarImagen(res.response.photo.name).subscribe(resp => {
        let imgBlob = resp
        this.terminoRef[i] = {
          id_credencial: this.terminoRef[i].id_credencial,
          apellido_materno: this.terminoRef[i].apellido_materno,
          apellido_paterno: this.terminoRef[i].apellido_paterno,
          cargo: this.terminoRef[i].cargo,
          nombres: this.terminoRef[i].nombres,
          numero_documento: this.terminoRef[i].numero_documento,
          objeto_contratacion: this.terminoRef[i].objeto_contratacion,
          qr: this.terminoRef[i].qr,
          sede_trabajo: this.terminoRef[i].sede_trabajo,
          tipo_documento: this.terminoRef[i].tipo_documento,
          imgPath: URL.createObjectURL(imgBlob),
          img: res.response.photo.name,
          created_at: moment().format("DD-MM-YYYY"),
          usuario: localStorage.getItem('id_usuario'),
          extension_documento: this.terminoRef[i].extension_documento,
          sigla: this.terminoRef[i].sigla
        }
        console.log(this.terminoRef[i]);
        this._credencialService.actualizarFoto2(this.terminoRef[i]).subscribe(res => {
          console.log(res);
        });
      }, (err) => {
        console.log(err);
      })
    })
  }

  guardarDatos() {
    console.log(this.terminoRef);
    this._credencialService.getAllSelected = this.terminoRef;
  }

}

