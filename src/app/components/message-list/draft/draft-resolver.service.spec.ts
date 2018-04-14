import { TestBed, inject } from '@angular/core/testing';

import { DraftResolverService } from './draft-resolver.service';

describe('DraftResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DraftResolverService]
    });
  });

  it('should be created', inject([DraftResolverService], (service: DraftResolverService) => {
    expect(service).toBeTruthy();
  }));
});
