import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import {AppMainComponent} from '../../app.main.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    user: any;
   

    constructor(public app: AppMainComponent,
                public router: Router,
                public usuarioService: UsuarioService ) {}

    ngOnInit() {

        // let datos = JSON.parse(localStorage.getItem('nombre'));
        // JSON.parse(localStorage.getItem('nombre'))

        // console.log(localStorage.getItem('id_usuario'));

        const body = {
            id_usuario: localStorage.getItem('id_usuario')
        }

        this.usuarioService.getUsuarioLogin(body).subscribe( res => {
            // console.log(res.datos.rows);
            this.user = res.datos.rows
        })
     
    }

    logout() {
        this.router.navigate(['/login']);
        this.usuarioService.logout();
    }
}
