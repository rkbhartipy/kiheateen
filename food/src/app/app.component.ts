import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'food';
  val:any;
  constructor(public apiService: ApiService){
    this.apiService.getAllStudent().subscribe((data)=>{
      this.val=data
    })
  }
}
