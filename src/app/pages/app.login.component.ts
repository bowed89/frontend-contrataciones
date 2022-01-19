import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginContratacionesService } from '../Services/login-contrataciones.service';
import { LoginService } from '../services/login.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
  login = {
    usuario:"",
    password:""
  }
  constructor(
    public service:LoginService,
    private _loginContratacionesService: LoginContratacionesService,
    private _usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
/*     this._loginContratacionesService.iniciarSesion(this.login).subscribe(res => {
      const id = '';
      console.log(res);
      for(let i in res){
        localStorage.setItem('id', res.res.id_usuario);
        localStorage.setItem('id_grupo', res.res.id_grupo);
        this.router.navigate(['/']);

      }
    }) */
    this._usuarioService.login(this.login).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/')
    })

  }

}
