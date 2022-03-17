import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-invoice',
  templateUrl: './digital-invoice.component.html',
  styleUrls: ['./digital-invoice.component.css']
})
export class DigitalInvoiceComponent implements OnInit {
  dataSource: Object;
  title: string;
  ClienteReguladoCampos = [ "Costo de energía: ", "Demanda: ", "Cargo Reactivo: ", "Cargo costos operativos: ", "Cargos por perdidas de distribución: ", "Cargo por transformacion: ", "Cargo por iluminación comunitaria: ", "Cargo servicios comunitarios: ", "Cargo comercialización: ", 'Cargo por financiamiento: ', 'Rectificación/Ajuste: ', 'Cargo por corte: ', 'Recargo por mora: ', 'Otros Conceptos: '];

  constructor() {
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
  }
}