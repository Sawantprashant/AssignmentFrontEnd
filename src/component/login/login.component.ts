import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/service/login.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, MatSnackBar]

})
export class LoginComponent {

  loginForm: FormGroup;
  selectedRole: string | any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      password: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(4)]],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password, role } = this.loginForm.value;
      this.loginService.doLogin(username, password, role)
        .pipe(
          catchError(error => {
            this.showSuccessMessage('Invalid User');
            return throwError(() => new Error('Invalid email or password'));
          })
        )
        .subscribe(response => {

          console.log('Token:', response.token);
          this.router.navigate(['/user']);
          this.showSuccessMessage('Login successfully');
          localStorage.setItem("Token", response.token);

        });
    } else
      this.showSuccessMessage("Invalide user");

  }
  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
