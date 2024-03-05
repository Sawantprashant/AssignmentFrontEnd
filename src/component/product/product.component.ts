import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/service/product.service';
import * as _ from 'lodash';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { AuthService } from 'src/service/auth.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule, MatDialogModule,HttpClientModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService,AuthService]
})
export class ProductComponent {

  pageIndex:number=0;
  pageSize:number=3;
  pageLength:number=1;
  elements: { productId: number; productName: string; price: number; suplierName: string; }[]=[];
  displayedColumns: string[] = ['ProductId' ,'ProductName' ,'Price' ,'suplierName'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.elements);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,private productService:ProductService,private authService:AuthService) {
    this.dataSource.paginator=this.paginator;
   }

  ngOnInit(): void {
this.dataRequest();
  }
 
  canAddProduct():boolean{
    
    if(this.authService.isAdmin()||this.authService.isManager()){
     this.displayedColumns= ['ProductId' ,'ProductName' ,'Price' ,'suplierName','action','delete'];
    return true;
    }
  else{
return false;
  }
  }

  addProduct() {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '40%'
      
    });
    }

  editProduct(Product: any): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '40%',
      data: Product
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
       
        console.log('User data updated:', result);
      }


    })
  }

  deleteProduct(product: any) {
    
    _.remove(this.elements, { productId: product.productId });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elements);
    this.productService.dropProduct(product.productId).subscribe(
      {
        next: response=> {
    this.dataRequest();
        } ,
        error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
      })
  }

  onPageChange($event: PageEvent) {
    this.pageSize=$event.pageSize;
    this.pageIndex= $event.pageIndex;
    this.dataRequest();
  }
  dataRequest(){
    this.productService.getProducts(this.pageIndex,this.pageSize).subscribe(
      {
        next: response=> {
          this.pageLength=response.pageCount;
    this.elements=response.product;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elements);
        } ,
        error: err =>{window.alert("somthing went wrong")},
        complete: () => console.log('Observer got a complete notification'),
      }
    )
    }
  
}

interface PeriodicElement {
  productId: number;
  productName: string;
  price: number;
  suplierName: string;
}
