import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";

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
  GetId(url: string, Id: number){
    return this.http.get(`${environment.api}${url}/${Id}`);
  }
  GetIdString(url: string, Id: string){
    return this.http.get(`${environment.api}${url}/${Id}`);
  }
  Post(url: string, body: any){
    return this.http.post(`${environment.api}${url}`, body);
  }
  PutId(url: string, Id: number, body: any){
    return this.http.put(`${environment.api}${url}/${Id}`, body);
  }
  Delete(url: string, Id:number){
    return this.http.delete(`${environment.api}/${url}/${Id}`);
  }
  Patch(url: string, Id:number, body: any){
    return this.http.patch(`${environment.api}${url}/${Id}`, body);
  }
}
