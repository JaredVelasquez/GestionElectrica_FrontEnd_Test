import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledInvoicesComponent } from './cancelled-invoices.component';

describe('CancelledInvoicesComponent', () => {
  let component: CancelledInvoicesComponent;
  let fixture: ComponentFixture<CancelledInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
