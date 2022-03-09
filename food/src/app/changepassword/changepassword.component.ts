import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(public apiService: ApiService,
              public router: Router) { }

  ngOnInit(): void {
  }

  passchngfun(passchngform:any){
    let record={"userid":localStorage.getItem("currentUserId"),
                "oldpass":passchngform.value.oldpassword,
                "password1":passchngform.value.new_password1,
                "password2":passchngform.value.new_password2}
    console.log("record", record)
    this.apiService.passChng(record).subscribe((data:any)=>{
      if(data){
        if(data=="1"){
          alert("Old password is incorrect")
        }
        else if(data=="2"){
          alert("New passwords should match")
        }
        else if(data=="3"){
          alert("Password updaed successfully")
          this.router.navigate(['/profile'])
        }
      }
    })

  }

}
