import { TestBed, inject } from '@angular/core/testing';

import { InboxResolverService } from './inbox-resolver.service';

describe('InboxResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InboxResolverService]
    });
  });

  it('should be created', inject([InboxResolverService], (service: InboxResolverService) => {
    expect(service).toBeTruthy();
  }));
});
