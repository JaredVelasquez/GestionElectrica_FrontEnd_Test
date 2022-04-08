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
    return this.http.get(`http://localhost:3000/${url}`);
  }
  GetId(url: string, Id: number){
    return this.http.get(`http://localhost:3000/${url}/${Id}`);
  }
  Post(url: string, body: any){
    return this.http.post(`http://localhost:3000/${url}`, body);
  }
  PutId(url: string, Id: number, body: any){
    return this.http.put(`http://localhost:3000/${url}/${Id}`, body);
  }
  Delete(url: string, Id:number){
    return this.http.delete(`http://localhost:3000/${url}/${Id}`);
  }
  Patch(url: string, Id:number, body: any){
    return this.http.patch(`http://localhost:3000/${url}/${Id}`, body);
  }
}
