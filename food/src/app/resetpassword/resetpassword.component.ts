import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  loader=false;
  constructor(public apiService: ApiService,
              public router: Router) { }
  ngOnInit(): void {
  }

  resetpassword(resetform:any){
    let email=resetform.value.email
    if(email!==null || email!==""){
      this.loader=true
      let record={'email':email}
      this.apiService.resetPasswordMail(record).subscribe((data:any)=>{
        if(data=="1"){
          this.loader=false
          alert("Email is already sent")
        }
        else if(data=="2"){
          this.loader=false
          alert("We have sent you the mail please check your mail to reset your password")
        }
        else if(data=="3"){
          this.loader=false
          alert("User does not exits with this email")
        }
      })
    }
  }
}
