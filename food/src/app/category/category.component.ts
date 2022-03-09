import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  fetchedcategoryFood:any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getFood("cat").subscribe(food => {
      this.fetchedcategoryFood=food
    })
  }
}
