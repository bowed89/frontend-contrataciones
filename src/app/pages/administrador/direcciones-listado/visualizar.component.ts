import {Component} from '@angular/core';
// import {Product} from './product';
// import {ProductService} from './productservice';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
// import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
import { MessageService } from 'primeng';
// import { NivelService } from 'src/app/services/nivel.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';

@Component({
    template:`
    <div class="container d-flex justify-content-center">
        <div *ngFor="let res of resp" class="card border-secondary mb-3" style="max-width: max-content;">
            <div class="card-header">
                <h6>DATOS DE DIRECCION</h6>
            </div>
            <div class="card-body text-secondary">
                <div class="row">
                    <div class="col-lg-6">
                        <h6>Nombre direccion:</h6>
                    </div>
                    <div class="col-lg-6">
                        <p>{{res.detalle}}</p>
                    </div>
                    <div class="col-lg-6">
                        <h6>Sigla:</h6>
                    </div>
                    <div class="col-lg-6">
                        <p>{{res.sigla}}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="card-body text-secondary">
                    <button class="btn btn-secondary" (click)="cancelar()" style="margin-left: 1%;">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
`})

export class Visualizar {
    resp: any;

   
    constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private router: Router, public messageService: MessageService, private fb: FormBuilder, private _unidadSolicitanteService: UnidadSolicitanteService) { }

    ngOnInit() {

        const body = {
            id_direccion: this._unidadSolicitanteService.id
        }

        this._unidadSolicitanteService.postDirecciones(body).subscribe( res => {
            console.log(res);
            this.resp = res.datos.rows
        })
    }

    // guardar(){
    
    //     const body = {
    //         detalle: this.miFormulario.value.direccion,
    //         sigla: this.miFormulario.value.sigla,
    //     }
    //     this._unidadSolicitanteService.postDireccion(body).subscribe( res => {
    //         // console.log(res);
    //     })
    //     this.cancelar();
    // }

    cancelar() {
        this.ref.close(); 
    }
}