import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataStoreService {

  signuptoken:any;
  constructor() { 
    console.log("service token in service component:", this.signuptoken);
  }
}
