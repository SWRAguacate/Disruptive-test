import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tipoContenido } from 'src/app/models/modelos';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  crearFormularioContenido(g: tipoContenido): FormGroup {
    return this.fb.group({
      'name': [g.name, []]
    })
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/contentType`);
  }

  getById(id: String){
    return this.http.get(`${environment.apiUrl}/contentType/${id}`);
  }

  createContentType(data: any){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.post(`${environment.apiUrl}/contentType`, json);
  }
}
