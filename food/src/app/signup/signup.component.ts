import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { LocalDataStoreService } from '../service/local-data-store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fullname:any="";
  username:any="";
  password1:any="";
  password2:any="";

  allStudents:any;
  userAlreadyExit:boolean = false;
  loader=false;
  singleUser:any;
  
  constructor(private apiService: ApiService, 
              private router: Router,
              public localData: LocalDataStoreService) { }

  // signup step 1
  ngOnInit(): void {
    this.apiService.getAllStudent().subscribe((data) => {
      this.allStudents=data
    })
  }

  // signup step 1 (called fun)
  checkCredential(){
    this.loader=true
    for (let i = 0; i < this.allStudents.length; i++) {
      if(this.username==this.allStudents[i].username){
        this.userAlreadyExit=true;
        this.singleUser=this.allStudents[i]
        break;
      }
    }

    // if user already exits or pending for verification
    if(this.userAlreadyExit==true && this.singleUser['verified_user']==true){
      alert("User with this username already exists")
      this.loader=false
      this.reloadCurrentRoute()
    }

    else if(this.userAlreadyExit==true && this.singleUser['verified_user']==false){
      alert("We have already sent you the mail to verify your account. Please check your mail to verify your account")
      this.loader=false
      this.reloadCurrentRoute()
    }
    else if(this.password1!=this.password2){
      alert("Password did not match")
      this.loader=false
      this.reloadCurrentRoute()
    }
    else{
      this.signUp()
    }
  }

  // signup step 2 (store the signup data)
  signUp(){
    if(this.fullname!="" && this.username!="" && this.password1!="" && this.password2!="" && (this.password1==this.password2) ){
      
      console.log("record created")
      let record={
        "fullname":this.fullname,
        "username":this.username,
        "password1":this.password1,
        "password2":this.password2,
      };

      this.apiService.createStudent(record).subscribe((data:any)=>{
        if(data=="1"){
          this.loader=false
          alert("You have registered successfully, please check your mail to to verify your account")
          this.router.navigate(['/login'])
        }
      })

    }
    else{
      console.log("all fields are required")
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
