import { TestBed } from '@angular/core/testing';

import { ArtesanoService } from './artesano.service';

describe('ArtesanoService', () => {
  let service: ArtesanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtesanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
