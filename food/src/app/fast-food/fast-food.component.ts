import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veg',
  templateUrl: './fast-food.component.html',
  styleUrls: ['./fast-food.component.css']
})
export class FastFoodComponent implements OnInit {

  vegFood:any;
  totalnoofitems:any;
  alreadyInCart:boolean=false;

  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private router: Router) { 
    }
  ngOnInit(): void {
    this.apiService.getFood("fastfood").subscribe((data)=>{
      this.vegFood=data;
    })
    let CUserId=localStorage.getItem('currentUserId')
    this.apiService.getFromCart(CUserId).subscribe((data:any)=>{
      if(data){
        this.totalnoofitems=data.length;
      }
    })
  }
  addtoCart(data:any){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      // this.cartService.addToCart(data)
      let record : any ={}
      record['userid']=localStorage.getItem("currentUserId")
      record['foodid']=data.id
      record['foodname']=data.foodname
      record['foodimage']=data.foodimage
      record['quantity']=1
      record['foodprice']=data.foodprice
      // initially total price of one product is equal to foodprice
      record['totalprice']=data.foodprice
      this.apiService.addToCart(record).subscribe((data:any) =>{
        if (data){
          console.log("data added successfully")
          if (data=="itemexits"){
            alert("Item already exists") 
          }  
          this.reloadCurrentRoute()
        }
      })
    }
    else{
      alert("Please login first")
    }
  }

  reloadCurrentRoute(){
    let currentUrl=this.router.url
    this.router.navigateByUrl('/', {skipLocationChange:true}).then(() => {
      this.router.navigate([currentUrl])
    })
  }
}
