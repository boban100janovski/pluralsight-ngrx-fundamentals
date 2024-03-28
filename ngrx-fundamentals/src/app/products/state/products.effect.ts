import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

@Injectable()
export class ProductEffects implements OnInitEffects {
  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private actions$: Actions
  ) {}

  readonly loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) => ProductsAPIActions.productsLoadedSuccess({ products })),
          catchError((error) => of(ProductsAPIActions.productsLoadedFail({ message: error })))
        )
      )
    );
  });

  readonly addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      concatMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) => ProductsAPIActions.productAddedSuccess({ product: newProduct })),
          catchError((error) => of(ProductsAPIActions.productAddedFail({ message: error })))
        )
      )
    );
  });

  readonly updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() => {
            return ProductsAPIActions.productUpdatedSuccess({
              update: { id: product.id, changes: product },
            });
          }),
          catchError((error) => of(ProductsAPIActions.productUpdatedFail({ message: error })))
        )
      )
    );
  });

  readonly deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsAPIActions.productDeletedSuccess({ id })),
          catchError((error) => of(ProductsAPIActions.productDeletedFail({ message: error })))
        )
      )
    );
  });

  readonly redirectToProductsPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ProductsAPIActions.productAddedSuccess,
          ProductsAPIActions.productUpdatedSuccess,
          ProductsAPIActions.productDeletedSuccess
        ),
        tap(() => this.router.navigate(['/products']))
      );
    },
    { dispatch: false }
  );
}
