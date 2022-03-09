import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  fullName:any;
  userName:any;
  phoneno:any;
  passWord1:any;
  passWord2:any;

  cUserId:any;

  user:any;

  stream:string="";
  year:string="";
  semester:string="";

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.cUserId=localStorage.getItem('currentUserId');
    this.apiService.getSingleStudent(this.cUserId).subscribe((data:any)=>{
      this.user=data;
        this.fullName=data.fullname;
        this.userName=data.username;
        this.stream=data.stream;
        this.year=data.year;
        this.semester=data.semester;

        this.passWord1=data.password1 
        this.passWord2=data.password2 
        this.phoneno=data.phoneno;
    })
  }

  update(){
    let record:any={
      "fullname":this.fullName,
      "username":this.userName,
      "phoneno":this.phoneno,
      "stream":this.stream,
      "year":this.year,
      "semester":this.semester,
    };
    console.log("user id is:", this.cUserId);
    this.apiService.updateStudent(this.cUserId, record).subscribe((data:any) => {
      if (data){
        alert("Data update successfully")
        this.router.navigate(['/profile'])
      }
    })
  }
}
