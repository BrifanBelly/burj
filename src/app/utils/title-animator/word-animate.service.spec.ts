import { TestBed, inject } from '@angular/core/testing';

import { WordAnimateService } from './word-animate.service';

describe('WordAnimateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordAnimateService]
    });
  });

  it('should be created', inject([WordAnimateService], (service: WordAnimateService) => {
    expect(service).toBeTruthy();
  }));
});
