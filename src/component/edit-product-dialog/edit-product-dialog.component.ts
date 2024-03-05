import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from 'src/service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [CommonModule,MatInputModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css'],
  providers:[ProductService,MatSnackBar]
})
export class EditProductDialogComponent {
  loginForm: FormGroup;
  Data:any;
constructor( private prodService:ProductService,private snackBar:MatSnackBar,private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){
  this.loginForm = this.formBuilder.group({
    productId: ['', [Validators.required]],
    productName : ['', [Validators.required]],
    price : ['', [Validators.required]],
    suplierName: ['', [Validators.required]],
    

  });
  if(data){
    this.Data=data;
  this.loginForm.patchValue(data);
  }
}


onSubmit() {
  if (this.loginForm.valid) {
    if(this.Data==null){
    const { productId,productName,price,suplierName } = this.loginForm.value;
 
    this.prodService.addProduct(productId,productName,price,suplierName).subscribe({
      next: data => {
        this.showSuccessMessage("element added");
        window.location.href = '/products';
      },
      error: err => {
        if (err.status === 204) {
          this.showSuccessMessage("element added");
        } else {
         console.log("massage"+err);
          this.showSuccessMessage("Something went wrong.");
        }
      },
      complete: () => console.log('Observer got a complete notification'),

    })
  }else{ 
    const { productId,productName,price,suplierName } = this.loginForm.value;
  
  this.prodService.editProduct(productId,productName,price,suplierName).subscribe({
    next: data => {
      this.showSuccessMessage("element added");
      window.location.href = '/products';
    },
    error: err => {
      if (err.status === 204) {
        this.showSuccessMessage("element added");
      } else {
       console.log("massage"+err);
        this.showSuccessMessage("Something went wrong.");
      }
    },
    complete: () => console.log('Observer got a complete notification'),

  })

  }
}

}

private showSuccessMessage(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });
}
}
