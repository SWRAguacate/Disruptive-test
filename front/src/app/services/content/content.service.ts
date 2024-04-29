import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { contenido } from 'src/app/models/modelos';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  crearFormularioContenido(g: contenido): FormGroup {
    return this.fb.group({
      'name': [g.name, []],
      'idContentType': [g.idContentType, []],
      'idCategory': [g.idCategory, []],
      'resource': [g.resource, []],
      'credits': [g.credits, []],
      'creationDate': [g.creationDate, []]
    })
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/content`);
  }

  getById(id: String){
    return this.http.get(`${environment.apiUrl}/content/${id}`);
  }

  createContent(data: any){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.post(`${environment.apiUrl}/content`, json);
  }

  updateContent(data: any, id: String){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.patch(`${environment.apiUrl}/content/${id}`, json);
  }

}
