import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
// social auth service
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // django based auth
  userName:any;
  password:any;
  allStudents:any;
  logged_in_successfully_or_not:boolean=false;

  // new var 
  userexits:boolean=false;
  verifieduser:boolean=false;
  singleuser:any;

  constructor(
    private authService:AuthService, 
    private router: Router, 
    private apiService: ApiService,
    private socialAService: SocialAuthService,
    ) { }

  ngOnInit(): void { 
    
  }

  // google and facebook authentication
  googleLogin(){
    this.socialAService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.socialAService.authState.subscribe((data:any)=>{
      if(data){
        this.postData(data);
      }
    })
  }

  postData(data:any){
    let record={
        "fullname": data.name, 
        "username": data.email, 
        "password1": "rohit@123",
        "password2": "rohit@123",
        "verified_user": "True",
        "photourl": data.photoUrl
      }
    this.apiService.googleLogin(record).subscribe((data:any)=>{

    if (data["msg"]=="1"){
    localStorage.setItem("currentUserId", data["id"])
    }
    if (data["msg"]=="2"){
    localStorage.setItem("currentUserId", data["id"])
    }
    })
    this.authService.userData=data
    this.authService.googleAuth()
  }

  facebookLogin(){
  }

  // django based auth
  login(){
    this.apiService.getAllStudent().subscribe((data:any)=>this.allStudents=data)
    setTimeout(()=>{this.fetchData()},500)
  }


  fetchData(){
    for(let i=0; i<this.allStudents.length; i++){
      if(this.allStudents[i].username==this.userName){
        this.singleuser=this.allStudents[i]
        this.userexits=true;
        break;
      }
    }

    if(this.userexits==false){
      alert("User does not exits with this username or email")
      this.reloadCurrentRoute()
    }
    else{
      if(this.singleuser.verified_user==false){
        alert("User is not verified please check your email to verify your account")
        this.reloadCurrentRoute()
      }
      else{
        if(this.singleuser.username==this.userName && this.singleuser.password1==this.password && (this.userName!="" || this.password!="")){
          let id=this.singleuser.id
          localStorage.setItem("isUserLoggedIn","true")
          localStorage.setItem("currentUserId",id)
          this.router.navigate(['/profile'])
        }
        else{
          alert("Username or password is incorrect")
          this.reloadCurrentRoute()
        }
      }
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
