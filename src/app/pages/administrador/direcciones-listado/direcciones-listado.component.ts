import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, MessageService } from 'primeng';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import { Modal } from './modal.component';
import { Modificar } from './modificar.component';
import { Visualizar } from './visualizar.component';


@Component({
  selector: 'app-direcciones-listado',
  templateUrl: './direcciones-listado.component.html',
  styleUrls: ['./direcciones-listado.component.css'],
  providers: [DialogService, MessageService]
})
export class DireccionesListadoComponent implements OnInit {
  
  direcciones: any;
  cols: any[];

  constructor(private _unidadSolicitanteService: UnidadSolicitanteService, private dialogService: DialogService ) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.cols = [
      { field: 'detalle', header: 'DIRECCION' },
      { field: 'sigla' , header: 'SIGLA' },
      // { field: 'descripcion', header: 'GRUPO' },
      { field: '', header: 'ACCI0NES' }
    ];
    this._unidadSolicitanteService.getDireccion().subscribe( res => {
      // console.log(res);
      this.direcciones = res;
    })
  }

  selectProduct(product){


    // console.log(product);
    // console.log(product.sigla);
    // console.log(product.detalle);

    this._unidadSolicitanteService.id= product.id_direccion

    this.ref = this.dialogService.open(Visualizar, {
      width: '25%',
      contentStyle: {"max-height": "1500px", "overflow": "auto"},
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe( res => {
      // if (product) {
        // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
        this._unidadSolicitanteService.getDireccion().subscribe( res => {
          // console.log(res);
          this.direcciones = res;
        })
      // }
    });
    
  }

  modal() {
    this.ref = this.dialogService.open(Modal, {
      header: 'REGISTRAR NUEVA DIRECCION',
      width: '25%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe( res => {
      // if (product) {
        // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
        this._unidadSolicitanteService.getDireccion().subscribe( res => {
          // console.log(res);
          this.direcciones = res;
        })
      // }
    });
  }


  modificar(product) {

    this._unidadSolicitanteService.id= product.id_direccion

    this.ref = this.dialogService.open(Modificar, {
      header: 'REGISTRAR NUEVA DIRECCION',
      width: '25%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe( res => {
      // if (product) {
        // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
        this._unidadSolicitanteService.getDireccion().subscribe( res => {
          // console.log(res);
          this.direcciones = res;
        })
      // }
    });
  }


}
