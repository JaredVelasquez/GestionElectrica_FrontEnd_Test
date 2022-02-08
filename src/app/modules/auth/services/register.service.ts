import { Injectable } from '@angular/core';
import { regisUser } from 'src/Core/interfaces/registerUser.interface';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  SubmitRegisterUser(user: regisUser){
    return this.http.post(`${environment.api}register`, user);
  }
}
