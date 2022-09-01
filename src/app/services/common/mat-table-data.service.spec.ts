import { TestBed } from '@angular/core/testing';

import { MatTableDataService } from './mat-table-data.service';

describe('MatTableDataService', () => {
  let service: MatTableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatTableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
