import { TestBed } from '@angular/core/testing';

import { UserShareService } from './user-share.service';

describe('UserShareService', () => {
  let service: UserShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
