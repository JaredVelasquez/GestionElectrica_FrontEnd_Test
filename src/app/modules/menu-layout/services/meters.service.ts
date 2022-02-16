import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { MeterInterface } from 'src/Core/interfaces/model-meter.interface';

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
  DeleteMeter(Id:number, url: string){
    return this.http.delete(`${environment.api}${url}/${Id}`);
  }
  PostMeter(url: string, meter: MeterInterface){
    return this.http.post(`${environment.api}${url}`, meter);
  }
}
