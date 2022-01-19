import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsesoriaService } from 'src/app/Services/asesoria.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-informe-legal',
  templateUrl: './editar-informe-legal.component.html',
  styleUrls: ['./editar-informe-legal.component.css']
})
export class EditarInformeLegalComponent implements OnInit {
  ci: string;
  notaAceptacion: string;
  sippase: string;
  sin: string;
  nua: string;
  rupe: string;
  observaciones: string;
  recomendaciones: string;

  id: string;

  constructor(
    private _asesoriaService: AsesoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this._asesoriaService.getInformeById(this.id).subscribe(res => {
        console.log('getInformeById=> ', res);
        this.ci = res[0].ci;
        this.notaAceptacion = res[0].nota_aceptacion;
        this.sippase = res[0].sippase;
        this.sin = res[0].sin;
        this.nua = res[0].nua;
        this.rupe = res[0].rupe;
        this.observaciones = res[0].observaciones;
        this.recomendaciones = res[0].recomendaciones;

      })

    })
  }

  onSubmit() {
    const object = {
      ci: this.ci,
      nota_aceptacion: this.notaAceptacion,
      sippase: this.sippase,
      sin: this.sin,
      nua: this.nua,
      rupe: this.rupe,
      observaciones: this.observaciones,
      recomendaciones: this.recomendaciones
    }
    console.log(object);

    this._asesoriaService.putInformeLegal(object, this.id).subscribe(res => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Informe actualizado correctamente.',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        this.router.navigate(['/asesoria-listado'])
      }, 3000)
    })

  }

}
