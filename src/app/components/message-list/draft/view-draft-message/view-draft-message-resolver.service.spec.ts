import { TestBed, inject } from '@angular/core/testing';

import { ViewDraftMessageResolverService } from './view-draft-message-resolver.service';

describe('ViewDraftMessageResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewDraftMessageResolverService]
    });
  });

  it('should be created', inject([ViewDraftMessageResolverService], (service: ViewDraftMessageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
