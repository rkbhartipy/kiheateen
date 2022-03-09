import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  totalnoofitems:any;

  constructor(
    public authService: AuthService, 
    private router: Router, 
    private apiService: ApiService) { 
    if (localStorage.getItem("isUserLoggedIn")){
      this.isLoggedIn=true
    }
  }

  ngOnInit(): void {
    let CUserId=localStorage.getItem('currentUserId')
    if (CUserId){
      this.apiService.getFromCart(CUserId).subscribe((data:any)=>{
        if(data){
          this.totalnoofitems=data.length;
        }
      })
    }
  }

  signout(){
    localStorage.removeItem("username")
    localStorage.removeItem("useremail")
    localStorage.removeItem("userphoto")
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("isUserLoggedIn");
    this.router.navigate(['/home'])
  }

}
