import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.css']
})
export class MenuLayoutComponent implements OnInit {
  isCollapsed = true;

  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  constructor() { }

  ngOnInit(): void {
  }
  notify(): void {
    console.log('notify');
  }

}
