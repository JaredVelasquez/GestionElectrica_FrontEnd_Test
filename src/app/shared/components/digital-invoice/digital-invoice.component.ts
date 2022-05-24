import { Component, Input, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ChargesShema } from 'src/Core/interfaces/charges.interface';
import { LecturasPorContrato } from "src/Core/interfaces/eeh-invoice";
import { formatDate } from '@angular/common';



import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  dataSource!: {chart:{}, data: [{}]};
  title: string;

  
  url = {
    getHistorico: "get-invoices-contract",
  }
  constructor(
    private globalService: EndPointGobalService,

  ) {
    this.title = 'Historico consumo energia activa';

  }
  
  ngOnInit(): void {
    this.isVisible = false;
    // this.globalService.GetId( 'cargos-facturas', this.dataInvoice.cargoFacturaId).subscribe(
    //   (result: any) => {
    //     this.ChargePosition = result;
    //   }
    // );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.dataInvoice){
      this.vencimiento = (this.UnDiaMLS * this.dataInvoice.contrato.diasDisponibles) + this.hoy;
      this.diaFacturacion = this.numeroADia(this.dataInvoice.contrato.diaGeneracion);
      this.GetHistorico(this.dataInvoice.contrato.contratoId);
      if(!this.dataSource){
        this.dataSource = {
          chart: {
            caption: 'Countries With Most Oil Reserves [2017-18]',
            subCaption: 'In MMbbl = One Million barrels',
            xAxisName: 'Country',
            yAxisName: 'Reserves (MMbbl)',
            numberSuffix: 'K',
            theme: 'fusion'
          },
          data: [{
            
           label: '[' + formatDate(this.dataInvoice.medidor[0].historico.fechaAnterior ,'yyyy-MM-dd','en-US').toString() + ' - '  + formatDate(this.dataInvoice.medidor[0].historico.fechaAnterior,'yyyy-MM-dd','en-US').toString(), value: (this.dataInvoice.totalLecturaActivaAjustada.toFixed(2)).toString() ,

          }
          ]
        };

      }else{
        this.dataSource.data.push(
          { label: '[' + formatDate(this.dataInvoice.medidor[0].historico.fechaAnterior ,'yyyy-MM-dd','en-US').toString() + ' - '  + formatDate(this.dataInvoice.medidor[0].historico.fechaAnterior,'yyyy-MM-dd','en-US').toString(), value: (this.dataInvoice.totalLecturaActivaAjustada.toFixed(2)).toString() },

        );

      }

      console.log(this.dataSource);
      
    }
    
  }
  ngOnDestroy(): void {
    
  }

  GetHistorico(id : number){
    this.globalService.GetId( this.url.getHistorico, id).subscribe(
      (result : any) => {
        if(result){
            this.dataSource = {
              chart: {
                caption: 'Countries With Most Oil Reserves [2017-18]',
                subCaption: 'In MMbbl = One Million barrels',
                xAxisName: 'Country',
                yAxisName: 'Reserves (MMbbl)',
                numberSuffix: 'K',
                theme: 'fusion'
              },
              data: [{
                
              }
              ]
            };
            
            for(let data of result){
              this.dataSource.data.push(
                { label: '[' + formatDate(data.fechaInicio.toISOString(),'yyyy-MM-dd','en-US').toString() + ' - '  + formatDate(data.fechaFinal.toISOString(),'yyyy-MM-dd','en-US').toString(), value: (data.energiaConsumida.toFixed(2)).toString() },
              );
            }
          

        }
      }
    );
  }
  GenerarFactura(): void {
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
    