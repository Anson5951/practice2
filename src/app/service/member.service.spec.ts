import { TestBed } from '@angular/core/testing';

import { MemberService } from './member.service';
import { Member } from '../class/member';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
