import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-layout-page',
  templateUrl: './menu-layout-page.component.html',
  styleUrls: ['./menu-layout-page.component.css']
})
export class MenuLayoutPageComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
