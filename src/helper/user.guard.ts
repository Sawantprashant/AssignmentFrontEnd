import { CanActivateFn } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('Token');
  if (token) {
    const tokenParts = token.split('.');
   
      const payload = JSON.parse(atob(tokenParts[1]));
      const roles: string[] = payload['role'];
    if( roles.includes('Admin')||roles.includes('Manager'))
        return true;
      else{
        window.location.href='/products';
        return false;
      }
  }else{
    window.location.href='/products';
    return false;
  }
};
