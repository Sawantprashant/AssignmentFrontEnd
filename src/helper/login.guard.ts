import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('Token')) {
     return false;
  } else {
   
    
    return true;}
};

