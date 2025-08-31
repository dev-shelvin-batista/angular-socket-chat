import { CanActivateFn } from '@angular/router';

export const validateUserGuard: CanActivateFn = (route, state) => {
  return true;
};
