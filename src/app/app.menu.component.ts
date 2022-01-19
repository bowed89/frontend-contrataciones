import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { UsaService } from './Services/usa.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];
    ex: Array<any> = []


    constructor(
        public app: AppMainComponent,
        private _usaService: UsaService
    ) { }

    ngOnInit() {
        var id;
        id = {id: localStorage.getItem('id_grupo')}
        console.log('id_grupo??', id);
        if (id.id != 3) {
            this._usaService.getMenu(id).subscribe(res => {
                console.log('menu', res);
                for (let i in res) {
                    this.ex.push({
                        label: res[i].label,
                        icon: res[i].icon,
                        routerLink: res[i].router
                    })
                }
            })
        }else {
            this._usaService.getMenuAll().subscribe(res => {
                console.log('menuAll', res);
                for (let i in res) {
                    this.ex.push({
                        label: res[i].label,
                        icon: res[i].icon,
                        routerLink: res[i].router
                    })
                }
            })
        }
        this.model = [
            { label: 'POSTULANTES SELECCIONADOS', icon: 'desktop_mac', routerLink: ['/components/sample'] },
            { label: 'UNIDAD SOLICITANTE', icon: 'menu', routerLink: ['/formulario-listado'] },
            { label: 'PLANIFICACIÓN', icon: 'message', routerLink: ['/fuc-listado'] },
            { label: 'USA', icon: 'message', routerLink: ['/poa-listado'] },
        ]
    }
    onMenuClick() {
        this.app.menuClick = true;
    }
}
