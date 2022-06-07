import { TestBed } from '@angular/core/testing';

import { AvatarService } from './avatar.service';

describe('AvatarServiceService', () => {
  let service: AvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
