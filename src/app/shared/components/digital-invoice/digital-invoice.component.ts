import { Component, Input, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { Observable } from 'rxjs';
import { ChargesShema } from 'src/Core/interfaces/charges.interface';
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';

import { NgxSpinnerService } from 'ngx-spinner';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-digital-invoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './digital-invoice.component.html',
  styleUrls: ['./digital-invoice.component.css']
})
export class DigitalInvoiceComponent implements OnInit {

  @Input() dataInvoice !: InvoiceInterface;
  ChargePosition!: ChargesShema;
  dataSource: Object;
  title: string;
  ClienteReguladoCampos = [ "Costo de energía: ", "Demanda: ", "Cargo Reactivo: ", "Cargo costos operativos: ", "Cargos por perdidas de distribución: ", "Cargo por transformacion: ", "Cargo por iluminación comunitaria: ", "Cargo servicios comunitarios: ", "Cargo comercialización: ", 'Cargo por financiamiento: ', 'Rectificación/Ajuste: ', 'Cargo por corte: ', 'Recargo por mora: ', 'Otros Conceptos: '];

  constructor(
    private globalService: EndPointGobalService,
    private spinner: NgxSpinnerService

  ) {
    this.title = 'Angular  FusionCharts Sample';

    this.dataSource = {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { label: 'Venezuela', value: '290' },
        { label: 'Saudi', value: '260' },
        { label: 'Canada', value: '180' },
        { label: 'Iran', value: '140' },
        { label: 'Russia', value: '115' },
        { label: 'UAE', value: '100' },
        { label: 'US', value: '30' },
        { label: 'China', value: '30' }
      ]
    };
  }
  
  ngOnInit(): void {
    
    this.globalService.GetId( 'cargos-facturas', this.dataInvoice.cargoFacturaId).subscribe(
      (result: any) => {
        this.ChargePosition = result;
      }
    );
  }

  GenerarFactura(): void {
    this.spinner.show();
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
          doc.save(`factura-${this.dataInvoice.codigo}.pdf`);
          this.spinner.hide();
        
      });
    }else{
      console.log("No se pudo generar factura, content no existe");
      
    }
  }
}
    