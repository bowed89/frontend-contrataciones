import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsesoriaService } from 'src/app/Services/asesoria.service';

@Component({
  selector: 'app-visualizar-informe-legal',
  templateUrl: './visualizar-informe-legal.component.html',
  styleUrls: ['./visualizar-informe-legal.component.css']
})
export class VisualizarInformeLegalComponent implements OnInit {
  formInforme: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _asesoriaService: AsesoriaService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this._asesoriaService.getInformeById(param['id']).subscribe(res => {
        console.log(res);
        this.formInforme = res;
      })
    
    }) 
  }

}
