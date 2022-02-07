import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopConfirmComponent } from './pop-confirm.component';

describe('PopConfirmComponent', () => {
  let component: PopConfirmComponent;
  let fixture: ComponentFixture<PopConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
