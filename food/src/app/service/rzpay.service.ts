import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

function _window() : any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class RzpayService {

  URL="http://127.0.0.1:8000"
  cUserId=localStorage.getItem("currentUserId");

  constructor(public http: HttpClient) { }

  get nativeWindow() : any {
    return _window();
  }

  payWithRzorpay(id:any): any {
    return this.http.get(`${this.URL}/razorpayment/${id}/${"PAY"}/`)
  }

  saveAndDeleteCartItems(id:any, rzrpay_order_id:any):any{
    return this.http.get(`${this.URL}/razorpayment/${id}/${"SAVEPAYMENTDETAILS"}/${rzrpay_order_id}/`)
  }

  myfun():any{
    let a:string="rohit";
    return a;
  }

}
