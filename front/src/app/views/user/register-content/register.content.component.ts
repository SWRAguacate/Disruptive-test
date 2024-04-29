import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoria, contenido } from 'src/app/models/modelos';
import { CategoryService } from 'src/app/services/category/category.service';
import { ContentService } from 'src/app/services/content/content.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-content',
  templateUrl: './register.content.component.html',
  styles: [
    `
    #divForm {
      margin-top: 7rem !important;
    }
    `
  ]
})
export class RegisterContentComponent implements OnInit {
  form: any;
  categorias: categoria[] = [];
  base64String: String = "";

  constructor(private router: Router, private service: ContentService, private catService: CategoryService) {

  }

  onFileSelected(event: any) {
    const self = this;
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        self.base64String = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  ngOnInit(): void {
    this.crearVacio();
    const self = this;
    this.catService.getAll().subscribe({
      next(value: any) {
        const cats = value!!.Data;

        if(cats){
          cats.forEach((cat: any) => {
            self.categorias.push({
              _id: cat._id,
              name: cat.name,
              idContentType: cat.idContentType
            })
          });
        }
      },
    })
  }

  crearVacio(){
    let content: contenido = {}
    this.form = this.service.crearFormularioContenido(content);
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

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaActual.getFullYear();
    return `${dia}-${mes}-${año}`;
  }

  agregar() {
    const self = this;
    this.validarFormulario();

    const resource = this.form.value.idContentType == "IMG" ? this.base64String : this.form.value.resource;

    const json = {
      name: this.form.value.name,
      idContentType:this.form.value.idContentType,
      idCategory: this.form.value.idCategory,
      resource: resource,
      credits: localStorage.getItem('author'),
      creationDate: this.obtenerFechaActual()
    }

    this.service.createContent(json).subscribe({
      next(value) {
        Swal.fire({
          title: 'Contenido registrado, se redirigirá al inicio',
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
