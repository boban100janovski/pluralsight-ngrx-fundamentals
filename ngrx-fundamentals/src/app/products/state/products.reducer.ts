import { createReducer, on } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { ProductsState } from './products.state';

const initialState: ProductsState = {
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
