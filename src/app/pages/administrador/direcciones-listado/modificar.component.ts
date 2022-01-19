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
    <form [formGroup]="miFormulario" (ngSubmit)="onSubmit()" *ngFor="let res of resp">
        <div class="row">
            <div class="col-md-6">
                <div class="row mt-4">
                    <div class="col-md-5">Nombre direccion</div>
                    <div class="col-md-7">
                        <input class="form-control" type="text" formControlName="direccion" [(ngModel)]="res.detalle">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row mt-4">
                    <div class="col-md-5">Sigla</div>
                    <div class="col-md-7">
                        <input class="form-control" type="text" formControlName="sigla" [(ngModel)]="res.sigla">
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

export class Modificar {

    resp: any;

    miFormulario: FormGroup = this.fb.group({
        direccion: ['', [Validators.required]],
        sigla: ['', [Validators.required]],
    });
   
    constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private router: Router, public messageService: MessageService, private fb: FormBuilder, private _unidadSolicitanteService: UnidadSolicitanteService) { }

    ngOnInit() {
        // console.log(this._unidadSolicitanteService.id);   
        const body = {
            id_direccion: this._unidadSolicitanteService.id
        }
        this._unidadSolicitanteService.postDirecciones(body).subscribe( res => {
            console.log(res);
            this.resp = res.datos.rows
        })
    }

    guardar(){

        const body = {
            detalle: this.miFormulario.value.direccion,
            sigla: this.miFormulario.value.sigla,
        }

        this._unidadSolicitanteService.putDirecciones(body, this._unidadSolicitanteService.id).subscribe( res => {
            console.log(res);
        })

        this.cancelar();
    }

    cancelar() {
        this.ref.close(); 
    }
}