import { TestBed } from '@angular/core/testing';

import { AddFilmeService } from './add-filme.service';

describe('AddFilmeService', () => {
  let service: AddFilmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFilmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
