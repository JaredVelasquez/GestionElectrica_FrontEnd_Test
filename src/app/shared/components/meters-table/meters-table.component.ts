import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meters-table',
  templateUrl: './meters-table.component.html',
  styleUrls: ['./meters-table.component.css']
})
export class MetersTableComponent implements OnInit {
  @Input() listOfData!: Array<{ name: string; age: number; address: string }>;
  @Input() titles!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
