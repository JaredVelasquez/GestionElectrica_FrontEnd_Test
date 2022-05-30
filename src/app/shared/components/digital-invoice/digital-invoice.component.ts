import { Component, Input, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ChargesShema } from 'src/Core/interfaces/charges.interface';
import { LecturasPorContrato } from "src/Core/interfaces/eeh-invoice";
import { formatDate } from '@angular/common';
import { concatMap } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';



import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export interface facturas{
  
  cliente: string,
  codigo: string,
  codigoContrato: string,
  contratoId: number
  energiaConsumida: number,
  estado: number
  fechaCancelacion: string,
  fechaEmision: string,
  fechaFin: string,
  fechaInicio: string,
  fechaLectura: string,
  fechaVencimiento: string,
  total: number
}
@Component({
  selector: 'app-digital-invoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './digital-invoice.component.html',
  styleUrls: ['./digital-invoice.component.css']
})
export class DigitalInvoiceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataInvoice !: LecturasPorContrato;
  diaFacturacion: string = '';
  isVisible: boolean = false;
  spinnerIsVisible: boolean = false;
  UnDiaMLS = 86400000;
  hoy = Date.now();
  vencimiento: any;
  ChargePosition!: ChargesShema;
  @Input() dataSource!: {chart:{}, data?: [{}]};
  title: string;
  @Input() historicData!: facturas[];
  promedioConsumo = 0;
  contFacturas = 0;


  
  url = {
    getHistorico: "get-invoices-contract",
  }
  constructor(
    private globalService: EndPointGobalService,
    private message: NzMessageService

  ) {
    this.title = 'Historico consumo energia activa';

  }
  
  ngOnInit(): void {
    this.isVisible = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.historicData);
    if(this.dataInvoice){
      this.vencimiento = (this.UnDiaMLS * this.dataInvoice.contrato.diasDisponibles) + this.hoy;
      this.diaFacturacion = this.numeroADia(this.dataInvoice.contrato.diaGeneracion);
     this.GetHistorico(this.historicData);
      if(!this.dataSource){
        this.dataSource = {
          chart: {
            caption: 'Historico de consumo por facturas generadas',
            subCaption: 'Energia activa consumida',
            xAxisName: 'Fecha',
            yAxisName: 'Consumo kWh',
            numberSuffix: 'K',
            theme: 'fusion'
          }
        };
        this.dataSource.data?.push(
          { label: '[' + formatDate(this.dataInvoice.medidor[0].historico.fechaAnterior ,'yyyy-MM-dd','en-US').toString() + ' - '  + formatDate(this.dataInvoice.medidor[0].historico.fechaActual,'yyyy-MM-dd','en-US').toString() + ' ]', value: (this.dataInvoice.totalLecturaActivaAjustada.toFixed(2)).toString() });
        
          
        this.dataSource.data = [
          { label: '[' + formatDate(this.dataInvoice.medidor[0].historico.fechaAnterior ,'yyyy-MM-dd','en-US').toString() + ' - '  + formatDate(this.dataInvoice.medidor[0].historico.fechaActual,'yyyy-MM-dd','en-US').toString() + ' ]', value: (this.dataInvoice.totalLecturaActivaAjustada.toFixed(2)).toString() }];
        
          

      }

      
      this.promedioConsumo += this.dataInvoice.totalLecturaActivaAjustada;
      this.contFacturas ++;
      console.log(this.dataSource);
      
    }

    this.promedioConsumo /= this.contFacturas;
    
  }
  
  GetHistorico(historicData : facturas[]){
          console.log('Este es el historico de facturas');
          console.log(historicData);
          
          
            for(let data of historicData){
              if(Date.parse(data.fechaFin) < Date.parse(this.dataInvoice.medidor[0].historico.fechaAnterior)){
                console.log('fecha introducida en grafico');
                
                if(!this.dataSource){
                  this.dataSource = {
                    chart: {
                      caption: 'Historico de consumo por facturas generadas',
                      subCaption: 'Energia activa consumida',
                      xAxisName: 'Fecha',
                      yAxisName: 'Consumo kWh',
                      numberSuffix: 'K',
                      theme: 'fusion'
                    }
                  };
                  this.dataSource.data?.push(
                    { label: '[' + formatDate(data.fechaInicio,'yyyy-MM-dd','en-US').toString() + ' - '  + formatDate(data.fechaFin,'yyyy-MM-dd','en-US').toString(), value: (data.energiaConsumida.toFixed(2)).toString() }
                    );
                  
                  
                    this.dataSource.data = [
                      { label: '[' + formatDate(data.fechaInicio,'yyyy-MM-dd','en-US').toString() + ' - '  + formatDate(data.fechaFin,'yyyy-MM-dd','en-US').toString(), value: (data.energiaConsumida.toFixed(2)).toString() }];
                }

                
                
                  
                
                this.contFacturas ++;
                this.promedioConsumo += data.energiaConsumida;

              }
            }

            console.log(this.dataSource);
            
          

        
  }
  ngOnDestroy(): void {
    
  }

  GenerarFactura(): void {
    this.message
      .loading('Action in progress', { nzDuration: 4000 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Loading finished', { nzDuration: 2500 }).onClose!),
        concatMap(() => this.message.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
    const div = document.getElementById('content');

    const options = {
      background: 'white',
      scale: 3
    };

    const doc = new jsPDF('p', 'mm', 'a4', true);

    if(div){
      
      html2canvas(div, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        const bufferX = 5;
        const bufferY = 5;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        (doc as any).addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

        
        
        return doc;
      }).then((doc) => {
        
          doc.save(`factura-${'prueba'}.pdf`);
        
      });
      
    }else{
      console.log("No se pudo generar factura, content no existe");
    }
    
  }

  numeroADia(dia: number){
    let day;
    switch (dia) { 
      case 1: day = "Lunes"; 
      break; 
      case 2: day = "Martes"; 
      break; 
      case 3: day = "Miercoles"; 
      break; 
      case 4: day = "Jueves"; 
      break; 
      case 5: day = "Viernes"; 
      break; 
      case 6: day = "Sabado"; 
      break; 
      case 7: day = "Domingo"; 
      break;
      default:
        day = '';
       }
  
    return day;
  
  }
  

}
    