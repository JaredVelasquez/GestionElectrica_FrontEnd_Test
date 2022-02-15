import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@dev/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetersTableService {

  constructor(
    private http:HttpClient
  ) { }

  GetMeters(): Observable<any>{
    return this.http.get(`${environment.api}get-meters`);
  }
  DeleteMeter(Id:number, url: string){
    return this.http.delete(`${environment.api}${url}/${Id}`);
  }
}
