import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  url="https://localhost:7066/api/Product";
  constructor(private http:HttpClient) { }
  getProducts(page:number,pageSize:number):Observable<any> {
    return this.http.get(`${this.url}/${page}/${pageSize}`);
  }

  dropProduct(productId :number):Observable<any> {
    return this.http.delete(`${this.url}/${productId}`);
  }

  addProduct( ProductId :number, ProductName:string,Price:number,suplierName:string):Observable<any>{
return this.http.post(this.url,{ProductId,ProductName,Price,suplierName});
  }
  editProduct( ProductId :number, ProductName:string,Price:number,suplierName:string):Observable<any>{
    return this.http.put(this.url,{ProductId,ProductName,Price,suplierName});
  }
    
   

}
