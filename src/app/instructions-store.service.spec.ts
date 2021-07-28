import { TestBed } from '@angular/core/testing';

import { InstructionsStoreService } from './instructions-store.service';

describe('InstructionsStoreService', () => {
  let service: InstructionsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructionsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
