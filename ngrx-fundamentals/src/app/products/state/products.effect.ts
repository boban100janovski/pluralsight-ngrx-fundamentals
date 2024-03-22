import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  // loadProducts$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ProductsPageActions.loadProducts),
  //     mergeMap(() =>
  //       this.productsService.getAll().pipe(
  //         map((products) =>
  //           ProductsAPIActions.productsLoadedSuccess({ products })
  //         ),
  //         catchError((error) =>
  //           of(ProductsAPIActions.productsLoadedFail({ error }))
  //         )
  //       )
  //     )
  //   );
  // });
}
