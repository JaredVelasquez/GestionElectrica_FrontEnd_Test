import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerLoaderComponent } from './spiner-loader.component';

describe('SpinerLoaderComponent', () => {
  let component: SpinerLoaderComponent;
  let fixture: ComponentFixture<SpinerLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinerLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinerLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
