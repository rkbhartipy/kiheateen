import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-and-suggestion',
  templateUrl: './review-and-suggestion.component.html',
  styleUrls: ['./review-and-suggestion.component.css']
})
export class ReviewAndSuggestionComponent implements OnInit {


  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
  }
  
  reviewformdata(data:any){
    let userloggedin=localStorage.getItem("isUserLoggedIn")
    if(userloggedin){
      let record:any={
        "name":data.value.name,
        "review":data.value.comment
      }
      this.apiService.reviewandsuggestion(record).subscribe((data:any) =>{
        if(data){
          if(data=="1"){
            alert("Thank you for your feedback, we appreciate your valuable feedback")
            location.reload()
          }
        }
      })
    }
    else{
      alert("Please login first")
    }
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      this.router.navigate([currentUrl]);
    })
  }
}
