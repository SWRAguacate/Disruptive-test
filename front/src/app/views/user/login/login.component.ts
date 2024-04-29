import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { usuario } from 'src/app/models/modelos';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: any;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.crearVacio();
  }

  crearVacio(){
    let usuario: usuario = {}
    this.form = this.userService.crearFormularioLogin(usuario);
  }

  validarFormulario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      throw 'formulario invalido';
    }
  }

  tieneError(controlName: any) {
    if (this.form) {
      let control = this.form.get(controlName);
      return control?.invalid && control.touched;
    }
    return false;
  }

  login() {
    const self = this;
    this.validarFormulario();

    const json = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this.userService.login(json).subscribe({
      next(usuario: any) {
        if(usuario.Data._id){
          var jsonStringfied = JSON.stringify(usuario.Data);
          localStorage.setItem("loggedUser", jsonStringfied);
          localStorage.setItem("author", self.form.value.username);
          localStorage.setItem("role", usuario.Data.idRole);
          Swal.fire({
            title: 'Bienvenido',
            showCancelButton: false,
            confirmButtonColor: '#F9CD4C',
            confirmButtonText: 'OK'
          }).then((result) => {
            self.router.navigateByUrl('/dashboard');
            self.userService.setLoggedIn(true);
          });
        }
      },
      error(err: HttpErrorResponse) {
        console.log(err);
        if(err.status == 400){
          Swal.fire({
            title: 'Credenciales no válidas',
            showCancelButton: false,
            confirmButtonColor: '#F9CD4C',
            confirmButtonText: 'OK'
          });
        }

        if(err.status == 404){
          Swal.fire({
            title: 'No hay ninguna coincidencia con las credenciales proporcionadas',
            showCancelButton: false,
            confirmButtonColor: '#F9CD4C',
            confirmButtonText: 'OK'
          });
        }
      },
    });
  }

  redirigir(){
    this.router.navigateByUrl('/user/register');
  }
}
