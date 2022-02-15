import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
const TIME = 5000;

@Injectable({
  providedIn: 'root'
})
export class MetersService {

  constructor(
    private http: HttpClient
  ) { }

  GetMeters(): Observable<any>{
    return this.http.get(`${environment.api}get-meters`);
  }
  DeleteMeter(Id:number){
    return this.http.delete(`http://localhost:3000/medidors/${Id}`);
  }
}
