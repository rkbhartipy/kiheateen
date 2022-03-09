import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {


  codpay:any;
  onlinepay:any;

  totalprice:any=0;

  orderdate:any;
  orderid:any;

  alldata:any={};


  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    let id=localStorage.getItem("currentUserId")
    this.apiService.getInvoice(id).subscribe((data:any) =>{
      if(data){
        this.alldata=data;
        this.codpay=data[0].cod;
        this.onlinepay=data[0].foodido;
        this.onlinepay=data[0].onlinept;
        this.orderid=data[0].orderid;
        this.orderdate=data[0].orderdate;
        for(let i=0; i<data.length; i++){
          this.totalprice=this.totalprice+data[i].price
        }
      }
    })
  }
}
