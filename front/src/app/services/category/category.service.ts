import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { categoria } from 'src/app/models/modelos';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  crearFormularioCategoria(g: categoria): FormGroup {
    return this.fb.group({
      'name': [g.name, []],
      'idContentType': [g.idContentType, []]
    })
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/category`);
  }

  getById(id: String){
    return this.http.get(`${environment.apiUrl}/category/${id}`);
  }

  createCategory(data: any){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.post(`${environment.apiUrl}/category`, json);
  }
}
