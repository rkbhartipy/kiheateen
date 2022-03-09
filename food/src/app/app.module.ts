import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { VegComponent } from './veg/veg.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AuthguardGuard } from './guard/authguard.guard';
import { AuthService } from './service/auth.service';
import { ApiService } from './service/api.service';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component'
import { FastFoodComponent } from './fast-food/fast-food.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { AccVerifiedComponent } from './acc-verified/acc-verified.component';
import { environment } from 'src/environments/environment';

// social authentication
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PlacedorderComponent } from './placedorder/placedorder.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ChocolateComponent } from './chocolate/chocolate.component';
import { ColddrinkComponent } from './colddrink/colddrink.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CategoryComponent,
    VegComponent,
    Navbar2Component,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    CartComponent,
    UpdateComponent,
    FastFoodComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    SetpasswordComponent,
    AccVerifiedComponent,
    PlacedorderComponent,
    MyordersComponent,
    ChocolateComponent,
    ColddrinkComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireAuthModule,  
    AngularFirestoreModule,
    AngularFireStorageModule,
    SocialLoginModule
  ],
  providers: [
    AuthguardGuard,
    AuthService,
    ApiService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "240471024183-cv0m166vt0cj1qqd61h7vsfuf8b8pvao.apps.googleusercontent.com"
            )
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
