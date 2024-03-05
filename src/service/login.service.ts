
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:7066/api/Login'; 
  constructor(private http: HttpClient) { }

  doLogin(email: string, password: string,role:string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password,role}).pipe(
      catchError(error => {
        throw 'Error in logging in: ' + error;
      }));
  }
 
  
}
