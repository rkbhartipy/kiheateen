import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStudent } from './student';
import { Observable } from 'rxjs';
import { IFood } from './food';
import { ICartItems } from './cartitem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL="http://127.0.0.1:8000"
  cUserId=localStorage.getItem("currentUserId");

  a="all data is removed";

  constructor(private http:HttpClient) { 

  }

  getAllStudent():Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.URL}/user/`)
  }

  createStudent(record:any): any{
    return this.http.post(`${this.URL}/user/`, record)
  }

  getSingleStudent(id:number): Observable<IStudent>{
    return this.http.get<IStudent>(`${this.URL}/user/${id}/`)
  }

  updateStudent(id:number, record:any): Observable<IStudent>{
    return this.http.put<IStudent>(`${this.URL}/user/${id}/`, record)
  }

  // FOOD OPERATIONS
  getFood(cat:any): Observable<IFood[]>{
    return this.http.get<IFood[]>(`${this.URL}/food/${cat}/`)
  }

  // cart operations 
  // add to cart 
  addToCart(data:any): Observable<ICartItems[]>{
    return this.http.post<ICartItems[]>(`${this.URL}/addtocart/`, data)
  }

  // get from cart 
  getFromCart(CUserId:any): Observable<ICartItems[]>{
    return this.http.get<ICartItems[]>(`${this.URL}/getfromcart/${CUserId}/`)
  }

  // remove from cart 
  removeFromCart(foodid:any): Observable<ICartItems[]>{
    return this.http.delete<ICartItems[]>(`${this.URL}/cartoperation/${foodid}/`)
  }

  removeAllItems(fuserid:any){
    return this.http.delete<ICartItems[]>(`${this.URL}/cartoperation/${fuserid}/`)
  }

  decreaseNoOfItems(foodtableid:number): Observable<ICartItems[]>{
    return this.http.get<ICartItems[]>(`${this.URL}/plusorminus/${'minus'}/${foodtableid}/`)
  }

  increaseNoOfItems(foodtableid:number): Observable<ICartItems[]>{
    return this.http.get<ICartItems[]>(`${this.URL}/plusorminus/${'plus'}/${foodtableid}/`)
  }

  // password change
  passChng(record:any){
    return this.http.put(`${this.URL}/passchng/`, record)
  }

  // password reset1
  resetPasswordMail(record:any):any{
    return this.http.post(`${this.URL}/resetpassword/`, record)
  }

  // password reset2
  setPass(record:any):any{
    return this.http.post(`${this.URL}/setpass/`, record)
  }

  // password reset3
  checkLinkExpiration(token:any):any{
    let record={"token":token}
    return this.http.post(`${this.URL}/linkexpornot/`, record)
  }

  // password reset4
  signupTokenVerification(token:any):any{
    let record={"token":token}
    return this.http.post(`${this.URL}/signuptokenverification/`, record)
  }

  googleLogin(record:any):any{
    return this.http.post(`${this.URL}/googlelogin/`, record)
  }

  getAddress(id:any):any{
    return this.http.get(`${this.URL}/getpostaddress/${id}/`)
  }

  updateAddress(id:any, record:any):any{
    return this.http.put(`${this.URL}/getpostaddress/${id}/`, record)
  }

  COD(id:any):any{
    return this.http.post(`${this.URL}/codpaymentmode/`, {"id":id})
  }

  getInvoice(id:any):any{
    return this.http.get(`${this.URL}/getorderdetails/${id}`)
  }

  checkOrderedList(id:any):any{
    return this.http.get(`${this.URL}/checkorderedlist/${id}`)
  }
  
  saveAndDeleteCartItems(id:any):any{
    return this.http.get(`${this.URL}/checkorderedlist/${id}`)
  }

  reviewandsuggestion(data:any){
    return this.http.post(`${this.URL}/review/`, data)
  }

}
