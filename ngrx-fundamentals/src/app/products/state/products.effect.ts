import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

@Injectable()
export class ProductEffects {
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
          map((product) => ProductsAPIActions.productUpdatedSuccess({ product })),
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

  constructor(private productsService: ProductsService, private actions$: Actions) {}
}
