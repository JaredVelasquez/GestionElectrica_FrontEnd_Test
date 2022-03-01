import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndPointGobalService {

  constructor(
    private http: HttpClient
  ) { }

  Get(url: string){
    return this.http.get(`${environment.api}${url}`);
  }
  Post(url: string, body: any){
    return this.http.post(`${environment.api}${url}`, body);
  }
  Delete(url: string, Id:number){
    return this.http.delete(`${environment.api}${url}/${Id}`);
  }
}
