import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  steticDate(fecha: string){
    fecha =  formatDate(fecha, 'yyyy-MM-dd HH:mm:ss','en-US', 'GMT');
    return new Date(fecha).toLocaleDateString("en-US", {month: 'long', day: 'numeric'});
  }
}
