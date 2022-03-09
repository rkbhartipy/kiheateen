import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {

  token:any
  currentuser:any;

  constructor(public route:ActivatedRoute,
              public apiService: ApiService,
              public router:Router) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.token=param.get('token')
    })

    this.apiService.checkLinkExpiration(this.token).subscribe((data:any)=>{
      if (data=="2"){
        alert("This link is expired")
        this.router.navigate(['/home'])
      }
    })
  }

  // sending and resetting new passwords
  setpassfun(form:any){
    let record={"token":this.token, 
            "password1":form.value.password1,
            "password2":form.value.password2 
          }
    this.apiService.setPass(record).subscribe((data:any)=>{
      if(data=="1"){
        alert("Password was reset successfully now you can login")
        this.router.navigate(['/login'])
      }
      else if(data=="2"){
        alert("This password reset link is expired try initiate the process again")
      }
    }) 
  }
}
