import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/models/modelos';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
    #divForm {
      margin-top: 7rem !important;
    }
    `
  ]
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(private router: Router, private service: UserService) {

  }

  ngOnInit(): void {
    this.crearVacio();
  }

  crearVacio(){
    let persona: usuario = {}
    this.form = this.service.crearFormularioRegistro(persona);
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

  registrar() {
    const self = this;

    this.validarFormulario();

    const json = {
      username: this.form.value.username,
      email:this.form.value.email,
      celular: this.form.value.celular,
      password: this.form.value.password,
      idRole: this.form.value.idRole
    }

    this.service.createUser(json).subscribe({
      next(value: any) {
        var jsonStringfied = JSON.stringify(json);
        localStorage.setItem("loggedUser", jsonStringfied);
        self.router.navigateByUrl('/dashboard');
      },
      error(err: any) {
        console.log(err);
        self.router.navigateByUrl('/error500');
      },
    });

    this.crearVacio();
  }

  redirigirInicio(){
    this.router.navigateByUrl('/dashboard');
  }
}
