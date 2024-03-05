import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  data:string="";
  constructor(private authService:AuthService){
    const token = localStorage.getItem('Token');
if(token){
  
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        this.data = payload['role'];

}

  }
}

}
doLogout() {
localStorage.removeItem("Token");
window.location.href='/products'
}
getToken():boolean{
  if( localStorage.getItem('Token')){

  return false;}
else {
 
return true;
}
}
canAddProduct():boolean{
  return this.authService.isAdmin()||this.authService.isManager();
}
  title = 'AssignmentFrontEnd';
}
