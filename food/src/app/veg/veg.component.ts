import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
// import { CartService } from '../service/cart.service';
// import { AlldataService } from '../service/alldata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veg',
  templateUrl: './veg.component.html',
  styleUrls: ['./veg.component.css']
})
export class VegComponent implements OnInit {

  vegFood:any;
  totalnoofitems:any;
  alreadyInCart:boolean=false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService, 
    private router: Router) { 
    }

  ngOnInit(): void {
    this.apiService.getFood("veg").subscribe((data)=>{
      this.vegFood=data;
    })
  }

  addtoCart(data:any){
    if(localStorage.getItem("isUserLoggedIn")=="true"){
      let record : any ={}
      record['userid']=localStorage.getItem("currentUserId")
      record['foodid']=data.id
      record['foodname']=data.foodname
      record['foodimage']=data.foodimage
      record['quantity']=1
      record['foodprice']=data.foodprice
      // initially total price of one product is equal to foodprice
      record['totalprice']=data.foodprice

      console.log("the record is :", record)
      this.apiService.addToCart(record).subscribe((data:any) =>{
        if (data){
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
