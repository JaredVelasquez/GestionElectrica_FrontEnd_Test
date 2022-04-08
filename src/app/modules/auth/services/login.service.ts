import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  SubmitLogin(credentials:{identificator:string, password:string}){
    return this.http.post(`http://localhost:3000/login`, credentials);  

  }
}
