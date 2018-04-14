import { TestBed, inject } from '@angular/core/testing';

import { AppResoverService } from './app-resover.service';

describe('AppResoverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppResoverService]
    });
  });

  it('should be created', inject([AppResoverService], (service: AppResoverService) => {
    expect(service).toBeTruthy();
  }));
});
