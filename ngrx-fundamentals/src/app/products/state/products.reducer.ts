import { createReducer, on } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { ProductsState } from './products.state';

const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: '',
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state): ProductsState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductsPageActions.loadProducts, (state): ProductsState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }): ProductsState => {
    return {
      ...state,
      products,
      loading: false,
      errorMessage: '',
    };
  }),
  on(
    ProductsAPIActions.productsLoadedFail,
    (state, { message }): ProductsState => ({
      ...state,
      products: [],
      errorMessage: message,
      loading: false,
    })
  )
);
