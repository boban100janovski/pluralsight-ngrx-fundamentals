import { createReducer, on } from '@ngrx/store';
import { Product } from '../product.model';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

export interface ProductState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  loading: false,
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductsPageActions.loadProducts, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => {
    return {
      ...state,
      products,
      loading: false,
    };
  })
);
