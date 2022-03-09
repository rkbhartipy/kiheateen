import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { RzpayService } from '../service/rzpay.service';

@Component({
  selector: 'app-placedorder',
  templateUrl: './placedorder.component.html',
  styleUrls: ['./placedorder.component.css']
})
export class PlacedorderComponent implements OnInit {


  COD:any;
  OP:any;
  cUserId=localStorage.getItem("currentUserId")

  rzp_payment_id:any;
  rzp_order_id:any;
  public rzp_signature:any;

  constructor(public apiService: ApiService, 
              public router: Router,
              public rzpayservice: RzpayService) { }
  ngOnInit(): void {
  }
    

  placeOrder(form:any){
    if(this.COD=="cod"){
      this.CODP()
    }
    else{
      this.onlinePayment()
    }
  }

  CODP(){
    this.apiService.COD(this.cUserId).subscribe((data:any)=>{
      if(data){
        alert("Order is placed successfully")
        this.router.navigate(['/myorders'])
      }
    })
  }

  callfun():any{
    return "hello";
  }

  options = {
    "key": "rzp_test_mTTT4IIZCjbpsn", // Enter the Key ID generated from the Dashboard
    "amount": 0, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "KIHEATeen",
    "description": "Kamal Institue Of Higher Education And Advance Technology",
    "image": "https://scontent.fdel11-2.fna.fbcdn.net/v/t1.6435-1/90460812_2376975882402388_8028614832070590464_n.jpg?stp=dst-jpg_p148x148&amp;_nc_cat=105&amp;ccb=1-5&amp;_nc_sid=1eb0c7&amp;_nc_ohc=bIZPWR_MEQcAX-O8JLR&amp;_nc_ht=scontent.fdel11-2.fna&amp;oh=00_AT-cKtflz5R-VXd691xnRjSMs-8J9FsGdxiSNs1sx-l5rw&amp;oe=62416B57",
    
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

    // api obj
    "rzrpayapiobj":this.rzpayservice,
    "cuserid": this.cUserId,

    "handler": function (response:any){
        let uid=localStorage.getItem("currentUserId");
        let userorderid=localStorage.getItem("cuserorderid")

        alert("Your payment id is :" + response.razorpay_payment_id);
        alert("Your order id is :" + response.razorpay_order_id);
        
        // calling api directly to save and delete the data from cart 
        fetch(`http://127.0.0.1:8000/razorpayment/${uid}/save/${userorderid}/`)
          .then(response => {
            window.location.replace('http://localhost:4200/myorders');
          })
          .catch(error => {
              
          });
    },

    "prefill": {
        "name": "",
        "email": "",
        "contact": "",
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };

  

  onlinePayment(){
    this.rzpayservice.payWithRzorpay(this.cUserId).subscribe((data:any)=>{
      if(data=="0"){
        alert("Some error occured please try again")
      }
      else{
        this.options.amount=data.amount
        this.options.order_id=data.order_id
        this.options.prefill.email=data.email;
        this.options.prefill.name=data.name
        this.options.prefill.contact=data.contact
        let rzp1 = new this.rzpayservice.nativeWindow.Razorpay(this.options);
        rzp1.open()
        localStorage.setItem("cuserorderid", data.order_id)
      }
    })
  } 
}
