import { Component, OnInit } from "@angular/core";
import { UnidadSolicitanteService } from "src/app/Services/unidad-solicitante.service";
import { ActivatedRoute, Router } from '@angular/router';
import { drawDOM, pdf } from "@progress/kendo-drawing";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: "app-formulario-fuc",
    templateUrl: "./formulario-fuc.component.html",
    styleUrls: ["./formulario-fuc.component.css"],
})
export class FormularioFucComponent implements OnInit {
    // Variables para almacenar valores de checkboxes y radiobuttons
    formContValue: any;
    formAdjValue: any;
    metSelyAdjValue: any;
    SiObligatorio: any;
    NoObligatorio: any;

    id: any;
    getDatas: object;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    numero_documento: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _unidadSolicitanteService: UnidadSolicitanteService,
        private router: Router
    ) { }

    ngOnInit(): void {
        setTimeout(() => {
            // this.exportPDF()
        }, 500)

        setTimeout(() => {
            // this.router.navigate(['formulario-listado'])
        }, 1000)
        
        this.activatedRoute.params.subscribe(param => {
            this.id = param['id'];
            this._unidadSolicitanteService.getDatasForFucById(this.id).subscribe(res => {
                this._unidadSolicitanteService.getPostulantes2(res[0].id_postulantes).subscribe(res => {
                    this.nombres = res[0].nombres;
                    this.apellido_paterno = res[0].apellido_paterno
                    this.apellido_materno = res[0].apellido_materno
                    this.numero_documento = res[0].numero_documento
                })
                console.log(res);
                this.getDatas = res;
                var mc = parseInt(res[0].modalidad_contratacion)
        
                // check si modo contratacion tiene cierto num
                if (mc == 6 || mc == 5 || mc == 4 || mc == 3 || mc == 2 || mc == 1) {
                    $(document).ready(function () {
                        $(`.formContr${mc}`).prop("checked", true);
                    });
                }
                var fadj = res[0].forma_adjudicacion
                if (fadj == 1 || fadj == 2 || fadj == 3) {
                    $(document).ready(function () {
                        $(`.formAd${fadj}`).prop("checked", true);
                    });
                }
                var metSeAd = res[0].metodo_seleccion_adjudicacion
                if (metSeAd == 1 || metSeAd == 2 || metSeAd == 3 || metSeAd == 4 || metSeAd == 5) {
                    $(document).ready(function () {
                        $(`.metSelyAdj${metSeAd}`).prop("checked", true);
                    });
                }
            })
        })
    }

    exportPDF() {
        let randomNumber = Math.floor(100000000 + Math.random() * 900000000); 
        var contents = $('#impreso')[0];
        const img = document.getElementById("impreso")
        drawDOM(contents, {
           // forcePageBreak: ".page-break",
            paperSize: ['18in', '26in'],
            margin: { left: '1cm', top: '2cm', right: '1cm', bottom: '2cm' }
        }).then(function (group) {
            pdf.saveAs(group, `${randomNumber}.pdf`);
        });
    }
}
