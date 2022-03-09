import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchkeyword:any;

  constructor(
    private apiService: ApiService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  searchData(form:any){
    let searchkey=(form.value.searchfield).toLowerCase();

    if(searchkey=="veg" || searchkey=="vegfood" || searchkey=="veg-food" || searchkey=="veg food" || searchkey=="paneer" || searchkey=="cholle"){
      this.router.navigate(['/veg'])
    }

    else if(searchkey=="fast" || searchkey=="fastfood" || searchkey=="fast-food" || searchkey=="fast food" || searchkey=="burger" || searchkey=="pizza" || searchkey=="petiz" || searchkey=="nuddle" || searchkey=="choumin" || searchkey=="maggie" || searchkey=="maggie nuddle"){
      this.router.navigate(['/fast-food'])
    }

    else if(searchkey=="chocolates" || searchkey=="choco" || searchkey=="chocolate" || searchkey=="chocolates"){
      this.router.navigate(['/chocolate'])
    }

    else if(searchkey=="cold-drink" || searchkey=="colddrink" || searchkey=="drink" || searchkey=="drinks" || searchkey=="colddrinks" || searchkey=="cold drink" || searchkey=="drinks" || searchkey=="cold drinks"){
      this.router.navigate(['/colddrink'])
    }

    else if(searchkey=="food"){
      this.router.navigate(['/home'])
    }
    else{ 
      alert("Check the keyword or try diffrent keyword or item does not exits in our canteen")
    }
  }

}
