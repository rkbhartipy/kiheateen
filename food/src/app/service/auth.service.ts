import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // local/django auth
  isUserLoggedIn=false
  authUName:any="";
  authUPass:any="";

  // google auth
  userData:any;

  constructor(private route:ActivatedRoute, private router:Router) { 
    if(this.isUserLoggedIn==false) {
      this.router.navigate(['home'], { relativeTo: this.route });
    }
  }

  userLogin(name:any, password:any){
    this.isUserLoggedIn=true;
    localStorage.setItem("isUserLoggedIn", this.isUserLoggedIn? "true" : "false")
    return true;
  }

  googleAuth(){
    this.isUserLoggedIn=true;
    localStorage.setItem("isUserLoggedIn", this.isUserLoggedIn? "true" : "false")
    this.router.navigate(['/home'])
    return true;
  }


}
