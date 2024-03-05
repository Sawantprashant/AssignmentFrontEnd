import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isAdmin(): boolean {
    const token = localStorage.getItem('Token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const roles: string[] = payload['role'];
          return roles.includes('Admin');
      }
return false;
        
      }
        else {
          return false;
      }
    }
  isManager(): boolean {
    const token = localStorage.getItem('Token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const roles: string[] = payload['role'];
        
          return roles.includes('Manager');
      }
return false;
        
      }
        else {
          return false;
      }
    }
}
