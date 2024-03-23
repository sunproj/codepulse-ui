import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {


  deletecategorysubscription?: Subscription;
  //categories?: Category[]
  categories$?: Observable<Category[]>

  constructor(private categoryService: CategoryService) {

  }


  ngOnInit(): void {

    // Method used as subscribe
    /*this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response
        //console.log(response);
        console.log(this.categories);
      },
      error: (error) => {
      }
    });
    */

    // method used as Async Pipe
    this.categories$ = this.categoryService.getAllCategory();
  }

  Delete(id: string) {
    this.deletecategorysubscription = this.categoryService.DeleteCategory(id)
      .subscribe({
        next: (response) => {
          this.categories$ = this.categoryService.getAllCategory();
        }
      });

  }

  ngOnDestroy(): void {
    this.deletecategorysubscription?.unsubscribe();
  }
}
