import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.css']
})
export class MenuLayoutComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }
  notify(): void {
    console.log('notify');
  }

}
