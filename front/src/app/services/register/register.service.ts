import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { register } from 'src/app/models/modelos';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  crearFormularioRegistro(g: register): FormGroup {
    return this.fb.group({
      '_id': [g._id, []],
      'servicio': [g.servicio, []],
      'precio': [g.precio, []],
      'descripcion': [g.descripcion, []],
      'tipoRegistro': [g.tipoRegistro, []],
      'urlPeticion': [g.urlPeticion, []],
      'empresa': [g.empresa, []],
      'fecha': [g.fecha, []],
    })
  }

  crearFormularioDashboard(g: register): FormGroup {
    return this.fb.group({
      '_id': [g._id, []],
      'servicio': [g.servicio, []],
      'descripcion': [g.descripcion, []]
    })
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/registers`);
  }

  getById(id: String){
    return this.http.get(`${environment.apiUrl}/registers/${id}`);
  }

  createRegister(data: any){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.post(`${environment.apiUrl}/registers`, json);
  }

  updateRegister(data: any, id: String){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.patch(`${environment.apiUrl}/registers/${id}`, json);
  }
}
