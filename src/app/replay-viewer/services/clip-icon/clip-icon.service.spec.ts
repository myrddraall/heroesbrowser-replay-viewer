import { TestBed, inject } from '@angular/core/testing';

import { ClipIconService } from './clip-icon.service';

describe('ClipIconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipIconService]
    });
  });

  it('should be created', inject([ClipIconService], (service: ClipIconService) => {
    expect(service).toBeTruthy();
  }));
});
