import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLayoutPageComponent } from './menu-layout-page.component';

describe('MenuLayoutPageComponent', () => {
  let component: MenuLayoutPageComponent;
  let fixture: ComponentFixture<MenuLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLayoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
