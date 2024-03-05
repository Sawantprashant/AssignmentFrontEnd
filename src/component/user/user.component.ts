import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import * as _ from 'lodash';
import { UserService } from 'src/service/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/service/auth.service';
import { TokenInterceptor } from 'src/token.interceptor';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDialogModule,HttpClientModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[MatPaginator,UserService,AuthService,{ provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true }]
})
export class UserComponent {
  pageIndex:number=0;
  pageSize:number=3;
  pageLength:number=1;
  elements: { roleId:number,role:number,id:number,name:string,email:string,password:string,phone:string}[]=[];
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.elements.slice(0, 3));
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private dialog: MatDialog,private userService:UserService,private authService:AuthService) { 
    this.dataSource.paginator=this.paginator;
  }

  ngOnInit(): void {
    this.dataRequest();
  }
  canAddUser(): boolean {
    if(this.authService.isAdmin()){
      this.displayedColumns= ['id', 'name', 'email', 'action', 'delete'];
     return true;
     }
   else{
 return false;
   }
  
  }
  dataRequest(){
    this.userService.getUser(this.pageIndex,this.pageSize).subscribe(
      {
        next: response=> {
this.pageLength=response.pageCount;
    this.elements=response.user;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elements);
        } ,
        error: err =>{window.alert("somthing went wrong")},
        complete: () => console.log('Observer got a complete notification'),
      }
    )
    }
  addUser() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '250px'
     
    });
    }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '40%',
      data: user
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
       
        console.log('User data updated:', result);
      }


    })
  }

  deleteUser(user: any) {
    _.remove(this.elements, { id: user.id });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elements);
    this.userService.dropUser(user.id).subscribe(
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

}
export interface PeriodicElement {
  roleId:number,
  role:number,
  id:number,
  name:string,
  email:string,
  password:string,
  phone:string

}

