import { TestBed, inject } from '@angular/core/testing';

import { SentService } from './sent.service';

describe('SentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentService]
    });
  });

  it('should be created', inject([SentService], (service: SentService) => {
    expect(service).toBeTruthy();
  }));
});
