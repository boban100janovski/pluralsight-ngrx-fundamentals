import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import {
  selectProducts,
  selectProductsErrorMessage,
  selectProductsTotal,
} from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select((state: any) => state.products.loading);
  showProductCode$ = this.store.select((state: any) => state.products.showProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(ProductsPageActions.loadProducts());
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
