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
    <form [formGroup]="miFormulario" (ngSubmit)="onSubmit()">
        <div class="row">
            <div class="col-md-6">
                <div class="row mt-4">
                    <div class="col-md-5">Nombre direccion</div>
                    <div class="col-md-7">
                        <input class="form-control" type="text" formControlName="direccion">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row mt-4">
                    <div class="col-md-5">Sigla</div>
                    <div class="col-md-7">
                        <input class="form-control" type="text" formControlName="sigla">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row mt-4"></div>
            </div>
        </div>
        <button pButton icon="pi pi-check" label="Guardar" (click)="guardar()" style="margin-right: .5em"></button>
        <button pButton icon="pi pi-times" label="Cancelar" class="ui-button-danger" (click)="cancelar()"></button>
    </form>
`})

export class Modal {

    miFormulario: FormGroup = this.fb.group({
        direccion: ['', [Validators.required]],
        sigla: ['', [Validators.required]],
    });
   
    constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private router: Router, public messageService: MessageService, private fb: FormBuilder, private _unidadSolicitanteService: UnidadSolicitanteService) { }

    ngOnInit() {}

    guardar(){
    
        const body = {
            detalle: this.miFormulario.value.direccion,
            sigla: this.miFormulario.value.sigla,
        }
        this._unidadSolicitanteService.postDireccion(body).subscribe( res => {
            // console.log(res);
        })
        this.cancelar();
    }

    cancelar() {
        this.ref.close(); 
    }
}