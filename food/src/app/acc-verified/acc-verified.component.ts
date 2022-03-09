import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../service/api.service';
import { LocalDataStoreService } from '../service/local-data-store.service';

@Component({
  selector: 'app-acc-verified',
  templateUrl: './acc-verified.component.html',
  styleUrls: ['./acc-verified.component.css']
})
export class AccVerifiedComponent implements OnInit {

  token:any;
  loader=false;

  constructor(public router: Router,
              public route: ActivatedRoute, 
              public localData:LocalDataStoreService,
              public apiService: ApiService) { }
  ngOnInit(): void {
    this.loader=true;
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.token=param.get("token")
      this.apiService.signupTokenVerification(this.token).subscribe((data:any)=>{
        if (data){
          if(data=="1"){
            alert("Token is invalid")
          }
          else if(data=="2"){
            alert("Your account is verified now you can login")
            this.router.navigate(['/login'])
          }
          else if(data=="3"){
            alert("Token is invalid or expired")
          }
          else{
            this.loader=false;
          }
        }
        this.loader=false;
      })

    })
  }
}
