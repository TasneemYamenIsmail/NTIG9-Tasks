import { TestBed } from '@angular/core/testing';

import { RouterGuardsGuard } from './router-guards.guard';

describe('RouterGuardsGuard', () => {
  let guard: RouterGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouterGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
