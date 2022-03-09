import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VegComponent } from './veg/veg.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { UpdateComponent } from './update/update.component';
import { FastFoodComponent } from './fast-food/fast-food.component';
import { ChocolateComponent } from './chocolate/chocolate.component';
import { ColddrinkComponent } from './colddrink/colddrink.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { AccVerifiedComponent } from './acc-verified/acc-verified.component';
import { PlacedorderComponent } from './placedorder/placedorder.component';
import { MyordersComponent } from './myorders/myorders.component';

const routes: Routes = [ 
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"veg", component:VegComponent},
  {path:"chocolate", component:ChocolateComponent},
  {path:"fast-food", component:FastFoodComponent},
  {path:"colddrink", component:ColddrinkComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"profile", component:ProfileComponent, canActivate:[AuthguardGuard]},
  {path:"update", component:UpdateComponent, canActivate:[AuthguardGuard]},
  {path:"cart", component:CartComponent, canActivate:[AuthguardGuard]},
  {path:"resetpassword", component:ResetpasswordComponent},
  {path:"change-password", component:ChangepasswordComponent},
  {path:"set-password/:token", component:SetpasswordComponent},
  {path:"acc-verified/:token", component:AccVerifiedComponent},
  {path:"placeorder", component:PlacedorderComponent, canActivate:[AuthguardGuard]},
  {path:"myorders", component:MyordersComponent, canActivate:[AuthguardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
