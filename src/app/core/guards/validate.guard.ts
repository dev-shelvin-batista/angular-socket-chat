import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConnectionService } from '../../intranet/connection.service';


/**
 * 
 * Guard that allows you to validate whether a user has logged in or not depending on the URL
 * 
 * @param route 
 * @param state 
 * @returns 
 */
export const validateGuard: CanActivateFn = (route, state) => {
  const connectionSer = inject(ConnectionService);
  const router = inject(Router);

  if(state.url === '/login'){
    if(connectionSer.db.getItem("userNameAngular")) {
      return router.navigate(['/home']);
    }
  }
  if(state.url === '/home'){
    if(!connectionSer.db.getItem("userNameAngular")) {
      return router.navigate(['/login']);
    }
  }
  return true;
};
