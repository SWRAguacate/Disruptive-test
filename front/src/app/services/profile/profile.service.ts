import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { perfil } from 'src/app/models/modelos';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  crearFormularioContenido(g: perfil): FormGroup {
    return this.fb.group({
      'name': [g.name, []],
      'permissions': [g.permissions, []]
    })
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/profile`);
  }

  getById(id: String){
    return this.http.get(`${environment.apiUrl}/profile/${id}`);
  }

  createProfile(data: any){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.post(`${environment.apiUrl}/profile`, json);
  }
}
