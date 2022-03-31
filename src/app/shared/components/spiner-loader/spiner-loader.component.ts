import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-spiner-loader',
  templateUrl: './spiner-loader.component.html',
  styleUrls: ['./spiner-loader.component.css']
})
export class SpinerLoaderComponent implements OnInit {
  @Input() public message!: boolean;
  constructor() {}

  public ngOnInit() {}
}