import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { usuario } from 'src/app/models/modelos';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInSubject = new Subject<boolean>();

  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  crearFormularioLogin(g: usuario): FormGroup {
    return this.fb.group({
      'username': [g.username, []],
      'password': [g.password, []]
    })
  }

  crearFormularioRegistro(g: usuario): FormGroup {
    return this.fb.group({
      'username': [g.username, []],
      'email': [g.email, []],
      'password': [g.password, []],
      'idRole': [g.idRole, []]
    })
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/user`);
  }

  getById(id: String){
    return this.http.get(`${environment.apiUrl}/user/${id}`);
  }

  createUser(data: any){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.post(`${environment.apiUrl}/user`, json);
  }

  login(data: any){
    let json: any = JSON.parse(JSON.stringify(data));
    return this.http.post(`${environment.apiUrl}/user/login`, json);
  }
}
