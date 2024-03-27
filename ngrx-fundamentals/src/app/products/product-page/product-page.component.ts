import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { selectProductById } from '../state/products.selectors';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product$ = this.store.select(selectProductById(this.activatedRoute.snapshot.params['id']));

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const productId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getProduct(productId);
  }

  getProduct(id: number) {
    this.product$ = this.productsService.getById(id);
  }

  addProduct(product: Product) {
    this.productsService.add(product).subscribe(this.goToProductsPage);
  }

  updateProduct(product: Product) {
    this.productsService.update(product).subscribe(this.goToProductsPage);
  }

  deleteProduct(id: number) {
    this.productsService.delete(id).subscribe(this.goToProductsPage);
  }

  goToProductsPage = () => this.router.navigate(['/products']);
}
