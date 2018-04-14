import { TestBed, inject } from '@angular/core/testing';

import { MessageListResolverService } from './message-list-resolver.service';

describe('MessageListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageListResolverService]
    });
  });

  it('should be created', inject([MessageListResolverService], (service: MessageListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
