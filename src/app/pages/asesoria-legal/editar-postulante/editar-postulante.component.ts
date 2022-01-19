import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadSolicitanteService } from 'src/app/Services/unidad-solicitante.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-postulante',
  templateUrl: './editar-postulante.component.html',
  styleUrls: ['./editar-postulante.component.css']
})
export class EditarPostulanteComponent implements OnInit {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  numero_documento: string;
  nacionalidad: string;
  lugar_nacimiento: string;
  tipo_documento: string;
  correo: string;
  celular: string;
  direccion: string;
  zona: string;
  extension_documento: string;
  ciudad: string;
  telefono: string;

  id: number;

  constructor(
    private _unidadSolicitanteService: UnidadSolicitanteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      this._unidadSolicitanteService.getPersona(this.id).subscribe(res => {
        console.log(res);
        this.nombres = res[0].nombres;
        this.apellido_paterno = res[0].apellido_paterno;
        this.apellido_materno = res[0].apellido_materno;
        this.numero_documento = res[0].numero_documento;
        this.nacionalidad = res[0].nacionalidad;
        this.lugar_nacimiento = res[0].lugar_nacimiento;
        this.tipo_documento = res[0].tipo_documento;
        this.correo = res[0].correo;
        this.celular = res[0].celular;
        this.direccion = res[0].direccion;
        this.zona = res[0].zona;
        this.extension_documento = res[0].extension_documento;
        this.ciudad = res[0].ciudad;
        this.telefono = res[0].telefono;
      })
    })
  }

  onSubmit() {
    let object = {
      nombres: this.nombres,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      numero_documento: this.numero_documento,
      nacionalidad: this.nacionalidad,
      lugar_nacimiento: this.lugar_nacimiento,
      tipo_documento: this.tipo_documento,
      correo: this.correo,
      celular: this.celular,
      direccion: this.direccion,
      zona: this.zona,
      extension_documento: this.extension_documento,
      ciudad: this.ciudad,
      telefono: this.telefono
    }

    console.log(object);
    this._unidadSolicitanteService.putUser3(object, this.id).subscribe(res => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Postulante editado correctamente.',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        this.router.navigate(['/asesoria-listado'])
      }, 2000)

    }, (err) => {
      console.log(err);
    })

  }

}
