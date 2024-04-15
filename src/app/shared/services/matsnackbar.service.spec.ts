import { TestBed } from '@angular/core/testing';

import { MatsnackbarService } from './matsnackbar.service';

describe('MatsnackbarService', () => {
  let service: MatsnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatsnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
