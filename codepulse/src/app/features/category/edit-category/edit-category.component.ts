import { UpdateCategoryRequest } from './../models/update-category-request.models';
import { Category } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  constructor(private _activerouter: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router) { }

  id: string | null = null;
  parammapsubscription?: Subscription;
  editcategorysubscription?: Subscription;
  category?: Category
  test: string = "Hello"

  ngOnInit(): void {
    this.parammapsubscription = this._activerouter.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');

        if (this.id) {
          this.categoryService.getCategoryById(this.id)
            .subscribe({
              next: (response) => {
                this.category = response
              }
            })
        }
      }
    });
  }



  onSubmit(form: NgForm) {
    if (form.valid) {
      const updatecategoryRequest: UpdateCategoryRequest = {
        Name: this.category?.name ?? '',
        UrlHandle: this.category?.urlHandle ?? ''
      }

      // call service 
      if (this.id) {
        this.editcategorysubscription = this.categoryService.UpdateCategory(this.id, updatecategoryRequest)
          .subscribe({
            next: (response) => {
              this.category = response;
              this.router.navigateByUrl('/admin/categories');
            }
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.parammapsubscription?.unsubscribe();
    this.editcategorysubscription?.unsubscribe();
  }
}
