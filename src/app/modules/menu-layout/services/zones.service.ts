import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '@dev/environment';
@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(
    private http: HttpClient
  ) { }

  GetZones(){
    return this.http.get(`${environment.api}get-zones`);
  }
}
