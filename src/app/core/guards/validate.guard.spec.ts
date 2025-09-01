import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateGuard } from './validate.guard';

describe('validateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
