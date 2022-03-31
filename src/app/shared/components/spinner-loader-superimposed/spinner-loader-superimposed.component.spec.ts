import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoaderSuperimposedComponent } from './spinner-loader-superimposed.component';

describe('SpinnerLoaderSuperimposedComponent', () => {
  let component: SpinnerLoaderSuperimposedComponent;
  let fixture: ComponentFixture<SpinnerLoaderSuperimposedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerLoaderSuperimposedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerLoaderSuperimposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
