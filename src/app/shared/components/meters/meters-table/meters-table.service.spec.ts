import { TestBed } from '@angular/core/testing';

import { MetersTableService } from './meters-table.service';

describe('MetersTableService', () => {
  let service: MetersTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetersTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
