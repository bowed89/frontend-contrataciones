import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsaService } from 'src/app/Services/usa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import Swal from 'sweetalert2'

@Component({
  selector: 'app-cuadro-eq-crear',
  templateUrl: './cuadro-eq-crear.component.html',
  styleUrls: ['./cuadro-eq-crear.component.css']
})
export class CuadroEqCrearComponent implements OnInit {
  cuadroForm: FormGroup;
  max: number;

  constructor(
    private router: Router,
    private _usaService: UsaService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.cuadroForm = this.fb.group({
      cargo: ["", Validators.required],
      formacion: ["", Validators.required],
      expgen_anio: ["", Validators.required],
      expgen_mes: ["", Validators.required],
      expesp_anio: ["", Validators.required],
      expesp_mes: ["", Validators.required],
      cursos: ["", Validators.required],
      apiestado: ["ELABORADO", Validators.required],
      usucre: ["ADMIN", Validators.required],
      //feccre: ["", Validators.required],
      titulo_expgeneral: ["", Validators.required],
      titulo_expespecifica: ["", Validators.required],
      nivel_salarial: ["", Validators.required],
      sueldo: ["", Validators.required]
    });

    this._usaService.getCuadroEq().subscribe(res => {
      console.log('dsdd', res);
      var arr = [];
      // hallar el vaqlor maximo del id_cuadro
      for (let i in res) {
        arr.push(res[i].id_cuadro)
      }
      this.max = Math.max(...arr);

    })
  }

  onSubmit() {
    this.cuadroForm.value.id_cuadro = this.max + 1;
    console.log(this.cuadroForm.value);
    this._usaService.postCuadroEq(this.cuadroForm.value).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Cuadro de Equivalencia registrado correctamente.',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        this.router.navigate(['/usuarios/cuadro-listado'])
      }, 3000)
    }, (err) => {
      console.log(err.error);
      for (let i in err.error.errors) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `${err.error.errors[i].msg}`,
        })
      }
    })
  }

}
