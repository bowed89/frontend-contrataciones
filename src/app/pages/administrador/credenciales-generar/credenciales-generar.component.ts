import { Component, OnInit } from '@angular/core';
import { CredencialService } from 'src/app/Services/credencial.service';
import { drawDOM, pdf } from "@progress/kendo-drawing";
import { ActivatedRoute, Router } from '@angular/router';
import { AsesoriaService } from 'src/app/Services/asesoria.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-credenciales-generar',
  templateUrl: './credenciales-generar.component.html',
  styleUrls: ['./credenciales-generar.component.css']
})
export class CredencialesGenerarComponent implements OnInit {
  lists: object;
  getDatas: object;
  prueba: any;
  imgs: Array<any> = [];

  title = 'app';
  elementType = 'url';
  value: Array<any> = [];

  constructor(
    private _credencialService: CredencialService,
    private activatedRoute: ActivatedRoute,
    private _asesoriaService: AsesoriaService

  ) { }

  ngOnInit(): void {
    // console.log(this._credencialService.getAllSelected);
    // el campo img se inicializa con una url que sale 'unsafe error', se debe vaciar antes para q no arroje error
    for(let j in this._credencialService.getChangeSelected) {
      this._credencialService.getChangeSelected[j].img = ''
    }
    this.lists = this._credencialService.getAllSelected
    console.log(this.lists);

    // console.log(this._credencialService.getChangeSelected);

    for( let i in this.lists) {
      // console.log(this.lists[i].qr);
      this.value.push(`http://localhost:4200/#/verificador/${this.lists[i].qr}`)
      // this.value.push(`NOMBRE COMPLETO:${this.lists[i].nombres} ${this.lists[i].apellido_paterno} ${this.lists[i].apellido_materno}`)
    }
    
    // for (let i in this._credencialService.getChangeSelected) {
    //   console.log(this._credencialService.getChangeSelected[i].imgName);
    //   this._credencialService.mostrarImagen(this._credencialService.getChangeSelected[i].imgName).subscribe(resp => {
    //     console.log(resp);
    //     // this.lists[i] = {
    //     //   apellido_materno: this.lists[i].apellido_materno,
    //     //   apellido_paterno: this.lists[i].apellido_paterno,
    //     //   cargo: this.lists[i].cargo,
    //     //   nombres: this.lists[i].nombres,
    //     //   numero_documento: this.lists[i].numero_documento,
    //     //   objeto_contratacion: this.lists[i].objeto_contratacion,
    //     //   qr: this.lists[i].qr,
    //     //   sede_trabajo: this.lists[i].sede_trabajo,
    //     //   tipo_documento: this.lists[i].tipo_documento,
    //     //   img: URL.createObjectURL(resp), //resp es un blob pero con createObjectURL se convierte una url para mostrar en html <img ..>
    //     // }
    //   })
    // }
  }

  exportPDF() {
    var contents = $('#impreso')[0];
    const img = document.getElementById("impreso")
    drawDOM(contents, {
      forcePageBreak: ".page-break",
      paperSize: ['18in', '20in'],
      margin: { left: '5cm', top: '1cm', right: '3cm', bottom: '0cm' }
    }).then(function (group) {
      pdf.saveAs(group, "contrato.pdf");
    });
    //this.router.navigateByUrl('formulario-listado')
  }

}
