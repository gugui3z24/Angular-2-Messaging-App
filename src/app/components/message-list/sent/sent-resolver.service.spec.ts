import { TestBed, inject } from '@angular/core/testing';

import { SentResolverService } from './sent-resolver.service';

describe('SentResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentResolverService]
    });
  });

  it('should be created', inject([SentResolverService], (service: SentResolverService) => {
    expect(service).toBeTruthy();
  }));
});
