import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  cUserId:any;

  fullname:any;
  username:any;
  phoneno:any;
  photourl="";

  stream:any;
  year:any;
  semester:any;

  myordersexitsornot:any=false;

  constructor(
    private apiService: ApiService) { 
    this.cUserId=localStorage.getItem('currentUserId')
  }

  ngOnInit(): void {
    this.apiService.getSingleStudent(this.cUserId).subscribe((data:any)=>{
      this.fullname=data.fullname;
      this.username=data.username;
      this.photourl=data.photourl;
      this.phoneno=data.phoneno;

      this.stream=data.stream;
      this.year=data.year;
      this.semester=data.semester;
      
      console.log("photourl", this.photourl)
    })

    this.apiService.checkOrderedList(this.cUserId).subscribe((data:any)=>{
      if(data=="1"){
        this.myordersexitsornot=true
      }
    })

  }

}
