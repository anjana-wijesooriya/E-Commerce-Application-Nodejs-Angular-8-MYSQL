import { Component, OnInit } from '@angular/core';
import { ProductPaginData } from 'src/app/models/product-pagin-data';
import { Paging } from 'src/app/models/paging';
import { ProductService } from 'src/app/services/Product/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  loading = false;
  departmentName: string;
  categoryName: string;
  searchString: string;
  allWords: boolean;

  TOTAL = 0;
  CURRENT_PAGE = 1;
  PER_PAGE = 12;
  PRODUCT_COUNT: number;
  constructor(private productService: ProductService) { 
  }

  optionsSelect: Array<any>;
  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      ];
    this.getProducts();
  }

  setFilters(filters: Paging){
    filters.PageSize = this.PER_PAGE;
    filters.PageNumber = (this.CURRENT_PAGE - 1) * this.PER_PAGE;
    filters.CurrentPage = this.CURRENT_PAGE;
    this.departmentName = filters.DepartmentName;
    this.categoryName = filters.CategoryName;
    this.searchString = filters.SearchString;
    this.allWords = filters.IsAllWords;
    window['NProgress'].start(); 
    let productPagingObj: ProductPaginData = new ProductPaginData();
    this.productService.getProductList(filters).subscribe(a => {
      productPagingObj = a as ProductPaginData;
      this.productList = productPagingObj.Products;
      this.PRODUCT_COUNT = productPagingObj.ProductCount[0].ProductCount;
      window['NProgress'].done(); 
    });
  }

  getProducts(){
    let filterObj: Paging = new Paging();
    filterObj.DepartmentId = 0;
    this.departmentName = 'All Departments';
    filterObj.CategoryId = 0;
    filterObj.PageSize = this.PER_PAGE;
    filterObj.PageNumber = (this.CURRENT_PAGE - 1) * this.PER_PAGE;
    filterObj.CurrentPage = this.CURRENT_PAGE;
    filterObj.SearchString = '';
    window['NProgress'].start(); 
    let productPagingObj: ProductPaginData = new ProductPaginData();
    this.productService.getProductList(filterObj).subscribe(a => {
      productPagingObj = a as ProductPaginData;
      this.productList = productPagingObj.Products;
      this.PRODUCT_COUNT = productPagingObj.ProductCount[0].ProductCount;
      window['NProgress'].done(); 
    });
  }

  goToPage(n: number): void {
    this.CURRENT_PAGE = n;
    this.getProducts();
  }

  onNext(): void {
    this.CURRENT_PAGE++;
    this.getProducts();
  }

  onPrev(): void {
    this.CURRENT_PAGE--;
    this.getProducts();
  }

}
