import { TestBed } from '@angular/core/testing';

import { VigilanteRoutesGuard } from './vigilante-routes.guard';

describe('VigilanteRoutesGuard', () => {
  let guard: VigilanteRoutesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VigilanteRoutesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
