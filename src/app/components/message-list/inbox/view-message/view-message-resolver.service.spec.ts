import { TestBed, inject } from '@angular/core/testing';

import { ViewMessageResolverService } from './view-message-resolver.service';

describe('ViewMessageResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewMessageResolverService]
    });
  });

  it('should be created', inject([ViewMessageResolverService], (service: ViewMessageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
