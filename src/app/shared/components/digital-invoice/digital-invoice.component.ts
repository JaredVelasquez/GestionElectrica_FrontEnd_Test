import { Component, Input, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { ChargesShema } from 'src/Core/interfaces/charges.interface';
import { InvoiceInterface } from 'src/Core/interfaces/invoices-tables.interface';

import { NgxSpinnerService } from 'ngx-spinner';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SpinerLoaderComponent } from "../spiner-loader/spiner-loader.component";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Router } from '@angular/router'

@Component({
  selector: 'app-digital-invoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './digital-invoice.component.html',
  styleUrls: ['./digital-invoice.component.css']
})
export class DigitalInvoiceComponent implements OnInit, OnChanges, OnDestroy {
  private overlayRef!: OverlayRef;
  @Input() dataInvoice !: InvoiceInterface;
  isVisible: boolean = false;
  spinnerIsVisible: boolean = false;
  
  ChargePosition!: ChargesShema;
  dataSource: Object;
  title: string;
  ClienteReguladoCampos = [ "Costo de energía: ", "Demanda: ", "Cargo Reactivo: ", "Cargo costos operativos: ", "Cargos por perdidas de distribución: ", "Cargo por transformacion: ", "Cargo por iluminación comunitaria: ", "Cargo servicios comunitarios: ", "Cargo comercialización: ", 'Cargo por financiamiento: ', 'Rectificación/Ajuste: ', 'Cargo por corte: ', 'Recargo por mora: ', 'Otros Conceptos: '];

  constructor(
    private globalService: EndPointGobalService,
    private spinner: NgxSpinnerService,
    private overlay: Overlay,
    private router: Router

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
    this.isVisible = false;
    this.globalService.GetId( 'cargos-facturas', this.dataInvoice.cargoFacturaId).subscribe(
      (result: any) => {
        this.ChargePosition = result;
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {
    
  }

  GenerarFactura(): void {
    this.disableSpinner(true);
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

        
    this.disableSpinner(false);
        
        return doc;
      }).then((doc) => {
        
          doc.save(`factura-${this.dataInvoice.codigo}.pdf`);
        
      });
      
    }else{
      console.log("No se pudo generar factura, content no existe");
    }
    
  }







  

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinerLoaderComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }


  disableSpinner(disable: boolean){
    this.spinnerIsVisible = disable;
  }
  
}
    