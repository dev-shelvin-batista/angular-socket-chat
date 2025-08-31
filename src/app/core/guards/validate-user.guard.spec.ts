import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateUserGuard } from './validate-user.guard';

describe('validateUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
