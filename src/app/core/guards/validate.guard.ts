import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConnectionService } from '../../intranet/connection.service';


/**
 * 
 * Guard que permite validar si han ingresado usuario o no dependiendo de la url
 * 
 * @param route 
 * @param state 
 * @returns 
 */
export const validateGuard: CanActivateFn = (route, state) => {
  const connectionSer = inject(ConnectionService);
  const router = inject(Router);

  if(state.url === '/login'){
    if(connectionSer.db.getItem("userName")) {
      return router.navigate(['/home']);
    }
  }
  if(state.url === '/home'){
    if(!connectionSer.db.getItem("userName")) {
      return router.navigate(['/login']);
    }
  }
  return true;
};
