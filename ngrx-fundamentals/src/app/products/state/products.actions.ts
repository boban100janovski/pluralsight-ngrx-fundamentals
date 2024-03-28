import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    toggleShowProductCode: emptyProps(),
    loadProducts: emptyProps(),
    addProduct: props<{ product: Product }>(),
    updateProduct: props<{ product: Product }>(),
    deleteProduct: props<{ id: number }>(),
  },
});

export const ProductsAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    productsLoadedSuccess: props<{ products: Product[] }>(),
    productsLoadedFail: props<{ message: string }>(),
    productAddedSuccess: props<{ product: Product }>(),
    productAddedFail: props<{ message: string }>(),
    productUpdatedSuccess: props<{ update: Update<Product> }>(),
    productUpdatedFail: props<{ message: string }>(),
    productDeletedSuccess: props<{ id: number }>(),
    productDeletedFail: props<{ message: string }>(),
  },
});
