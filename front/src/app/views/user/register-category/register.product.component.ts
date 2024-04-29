import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoria } from 'src/app/models/modelos';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-register-category',
  templateUrl: './register.product.component.html',
  styles: [
    `
    #divForm {
      margin-top: 7rem !important;
    }
    `
  ]
})
export class RegisterCategoryComponent implements OnInit {
  form: any;

  constructor(private router: Router, private service: CategoryService) {

  }

  ngOnInit(): void {
    this.crearVacio();
  }

  crearVacio(){
    let categoria: categoria = {}
    this.form = this.service.crearFormularioCategoria(categoria);
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

  agregar() {
    const self = this;
    this.validarFormulario();

    const json = {
      name: this.form.value.name,
      idContentType:this.form.value.idContentType
    }

    this.service.createCategory(json).subscribe({
      next(value) {
        Swal.fire({
          title: 'Registro completado, se redirigirá al inicio',
          showCancelButton: false,
          confirmButtonColor: '#F9CD4C',
          confirmButtonText: 'OK'
        }).then((result) => {
          self.router.navigateByUrl('/dashboard');
        });
      },
      error(err) {
        console.log(err);
        self.router.navigateByUrl('/error500');
      },
    });

    this.crearVacio();
  }
}
