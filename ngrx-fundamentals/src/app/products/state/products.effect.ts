import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  readonly loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      concatMap(() =>
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
      exhaustMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((product) => ProductsAPIActions.productAddedSuccess({ product })),
          catchError((error) => of(ProductsAPIActions.productAddedFail({ message: error })))
        )
      )
    );
  });

  readonly updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      switchMap(({ product }) =>
        this.productsService.update(product).pipe(
          map((product) => ProductsAPIActions.productUpdatedSuccess({ product })),
          catchError((error) => of(ProductsAPIActions.productAddedFail({ message: error })))
        )
      )
    );
  });

  readonly deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map((product) => ProductsAPIActions.productDeletedSuccess({ id })),
          catchError((error) => of(ProductsAPIActions.productDeletedFail({ message: error })))
        )
      )
    );
  });
}
