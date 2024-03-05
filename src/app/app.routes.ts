import { Routes } from '@angular/router';
import { LoginComponent } from 'src/component/login/login.component';
import { ProductComponent } from 'src/component/product/product.component';
import { UserComponent } from 'src/component/user/user.component';
import { loginGuard } from 'src/helper/login.guard';
import { userGuard } from 'src/helper/user.guard';

export const routes: Routes = [
    {path:"login" ,component:LoginComponent, canActivate:[loginGuard]},
    {path:"user",component:UserComponent ,canActivate:[userGuard]},
    {path:"products",component:ProductComponent},
    {path:'',component:ProductComponent}
];
