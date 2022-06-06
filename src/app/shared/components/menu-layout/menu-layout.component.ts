import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.css']
})
export class MenuLayoutComponent implements OnInit {
  isCollapsed = true;

  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  constructor(
    private router: Router,
    private coockie: CookieService
  ) { }

  ngOnInit(): void {
  }
  notify(): void {
    console.log('notify');
  }
  endSession(){
    this.coockie.delete('tokensession');
    this.router.navigate(['/login']);
  }

}
