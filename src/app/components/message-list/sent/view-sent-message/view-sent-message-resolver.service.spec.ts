import { TestBed, inject } from '@angular/core/testing';

import { ViewSentMessageResolverService } from './view-sent-message-resolver.service';

describe('ViewSentMessageResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewSentMessageResolverService]
    });
  });

  it('should be created', inject([ViewSentMessageResolverService], (service: ViewSentMessageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
