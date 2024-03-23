import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
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
}
