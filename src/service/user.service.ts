import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  url="https://localhost:7066/api/Userserve";
  constructor(private http:HttpClient) { }
  getUser(page:number,pageSize:number):Observable<any> {
    return this.http.get(`${this.url}/getUser/${page}/${pageSize}`);
  }
  addUser(Name:string, password:string, role:string,phone:string,id:number,email:string):Observable<any>{
    
    return this.http.post("https://localhost:7066/api/Register",{Name,password,role,phone,id,email})
  }
  dropUser(id :number):Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
  UpdateUser(Name:string, password:string, role:string,phone:string,id:number,email:string):Observable<any> {
    return this.http.put(`${this.url}/update`,{Name,password,role,phone,id,email});
  }

}
