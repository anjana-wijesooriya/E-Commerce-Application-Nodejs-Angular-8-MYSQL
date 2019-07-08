import { Component, OnInit, Input } from '@angular/core';
import { Paging } from 'src/app/models/paging';
import { Category } from 'src/app/models/Category';
import { Department } from 'src/app/models/department';
import { CategoryService } from 'src/app/services/Category/category.service';
import { DepartmentService } from 'src/app/services/Department/department.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  departmentList: Department[];
  categoryList: Category[];
  filteredCategoryList: Category[];
  selectedDepartment: number;
  selectedCategory: number;
  searchString: string;
  searchForAllWords: boolean;

  @Input() productList: ProductListComponent;

  constructor(private departmentService: DepartmentService,
              private categoryService: CategoryService
              ) { }

  ngOnInit() {
    this.getCategoryList();
    this.getDepartmenstList();
    this.selectedDepartment = 0;
    this.selectedCategory = 0;
    this.searchForAllWords = false;
  }

  getDepartmenstList(){
    this.departmentService.getDepartments().subscribe(
      a => {
        this.departmentList = a as Department[];
        let allDep: Department = new Department();
        allDep.DepartmentId = 0;
        allDep.Name = 'All Departments';
        this.departmentList.push(allDep);
        this.getCategoriesByDepartmentId();
      }
    );
  }

  getCategoryList(){
    this.categoryService.getCategories().subscribe(a => {
      this.categoryList = a as Category[];
    })
  }

  getCategoriesByDepartmentId(){
    this.filteredCategoryList = this.categoryList.filter(a => a.DepartmentId == this.selectedDepartment);
    if(this.selectedDepartment == 0) {
      this.filteredCategoryList = this.categoryList;
    }
  }

  onSelectDepartment(department){
    this.selectedDepartment = department.DepartmentId;
    this.selectedCategory = 0;
    this.getCategoriesByDepartmentId();
    let filter: Paging = new Paging();
    filter.DepartmentId = this.selectedDepartment;
    filter.DepartmentName = this.departmentList.filter(a => a.DepartmentId == this.selectedDepartment)[0].Name;
    filter.CategoryId = this.selectedCategory;
    filter.CategoryName = (this.selectedCategory == 0)? '' : this.categoryList.filter(a => a.DepartmentId == this.selectedCategory)[0].Name;
    filter.SearchString = this.searchString;
    filter.IsAllWords = this.searchForAllWords;
    this.productList.setFilters(filter);
  }

  onSelectCategory(category){
    this.selectedCategory = category.CategoryId;
    let filter: Paging = new Paging();
    filter.DepartmentId = this.selectedDepartment;
    filter.DepartmentName = this.departmentList.filter(a => a.DepartmentId == this.selectedDepartment)[0].Name;
    filter.CategoryId = this.selectedCategory;
    filter.CategoryName = (this.selectedCategory == 0)? '' : this.categoryList.filter(a => a.DepartmentId == this.selectedCategory)[0].Name;
    filter.SearchString = this.searchString;
    filter.IsAllWords = this.searchForAllWords;
    this.productList.setFilters(filter);
  }

  onClickSearch(){
    let filter: Paging = new Paging();
    filter.DepartmentId = this.selectedDepartment;
    filter.DepartmentName = this.departmentList.filter(a => a.DepartmentId == this.selectedDepartment)[0].Name;
    filter.CategoryId = this.selectedCategory;
    filter.CategoryName = (this.selectedCategory == 0)? '' : this.categoryList.filter(a => a.DepartmentId == this.selectedCategory)[0].Name;
    filter.SearchString = this.searchString;
    filter.IsAllWords = this.searchForAllWords;
    this.productList.setFilters(filter);
  }


}
