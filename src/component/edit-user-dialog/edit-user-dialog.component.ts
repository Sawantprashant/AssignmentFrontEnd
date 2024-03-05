import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  providers: [UserService,MatSnackBar,HttpClient]
})
export class EditUserDialogComponent {
  loginForm: FormGroup;
Data:any;
  constructor(private userService: UserService, private snackBar: MatSnackBar, private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      phone: ['', [Validators.required]],
      password: [{ value: '', disabled: !!data }, [Validators.required, Validators.maxLength(8), Validators.minLength(4)]],
      id: [{ value: '', disabled: !!data }, [Validators.required]],
      role: [{ value: '', disabled: !!data }, Validators.required]

    });

    if(data!=null){
     
this.Data=data;
  this.loginForm.patchValue(data);
    }
  }


  onSubmit() {
   
    if (this.loginForm.valid) {
      const { name, password, role, phone, id, email } = this.loginForm.value;
     
     
      
      if(this.Data==null){
       
      this.userService.addUser(name, password, role, phone, id, email).subscribe({
        next: data => {
          this.showSuccessMessage("element added");
         
        },
        error: err => {
          console.error('Observer got an error: ' + err);
          this.showSuccessMessage("somthing went wrong");
        },
        complete: () => console.log('Observer got a complete notification'),

      })
      window.alert("hyjyi");
      window.location.href = '/user';

    }else{
     
      this.userService.UpdateUser(name, this.Data.password, "anything", phone, this.Data.id, email).subscribe({
        next: data => {
          this.showSuccessMessage("element added");
         
        },
        error: err => {
          console.error('Observer got an error: ' + err);
          this.showSuccessMessage("somthing went wrong");
        },
        complete: () => console.log('Observer got a complete notification'),

      })
      window.alert("role"+this.Data.role);
      window.location.href = '/user';
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

