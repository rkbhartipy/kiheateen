import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as $ from 'jquery'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  public allFoodItem : any =[]
  public grandtotalPrice : number=0;
  public totalprice : number=0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router:Router) { 
  }

  ngOnInit(): void {
    let CUserId=localStorage.getItem('currentUserId')
    this.apiService.getFromCart(CUserId).subscribe(data=>{
      if(data){
        this.allFoodItem=data;
        for(let i=0; i<data.length; i++){
          this.grandtotalPrice = this.grandtotalPrice + data[i].foodprice*data[i].quantity
        }
      }
      else{
      }
    })
  }

  removeItem(foodid:any){
    this.apiService.removeFromCart(foodid).subscribe(data=>{
      if(data){
        this.reloadCurrentRoute()
      }
    })
  }

  removeAllItem(){
    let CUserId=localStorage.getItem('currentUserId')
    this.apiService.removeAllItems(CUserId).subscribe(data=>{
      if (data){
        this.reloadCurrentRoute()
      }
    })
  }

  decrease(foodid:number){
    this.apiService.decreaseNoOfItems(foodid).subscribe(data=>{
      if(data){
        this.reloadCurrentRoute()
      }
    })
  }
  increase(foodid:number){
    this.apiService.increaseNoOfItems(foodid).subscribe(data=>{
      if(data){
        this.reloadCurrentRoute()
      }
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
