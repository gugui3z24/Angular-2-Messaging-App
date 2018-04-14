import { TestBed, inject } from '@angular/core/testing';

import { ReplyResolverService } from './reply-resolver.service';

describe('ReplyResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReplyResolverService]
    });
  });

  it('should be created', inject([ReplyResolverService], (service: ReplyResolverService) => {
    expect(service).toBeTruthy();
  }));
});
