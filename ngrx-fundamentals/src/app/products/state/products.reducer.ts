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
      errorMessage: '',
      products: [],
    };
  }),
  on(
    ProductsAPIActions.productsLoadedSuccess,
    (state, { products }): ProductsState => ({
      ...state,
      products,
      loading: false,
      errorMessage: '',
    })
  ),
  on(
    ProductsAPIActions.productsLoadedFail,
    (state, { message }): ProductsState => ({
      ...state,
      products: [],
      errorMessage: message,
      loading: false,
    })
  ),
  on(
    ProductsPageActions.addProduct,
    (state): ProductsState => ({
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(ProductsAPIActions.productAddedSuccess, (state, { product }): ProductsState => {
    return {
      ...state,
      products: [...state.products, product],
      loading: false,
      errorMessage: '',
    };
  }),
  on(
    ProductsAPIActions.productAddedFail,
    (state, { message }): ProductsState => ({
      ...state,
      errorMessage: message,
      loading: false,
    })
  ),
  on(
    ProductsPageActions.updateProduct,
    (state): ProductsState => ({
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(
    ProductsAPIActions.productUpdatedSuccess,
    (state, { product }): ProductsState => ({
      ...state,
      loading: false,
      products: state.products.map((existingProduct) =>
        existingProduct.id === product.id ? product : existingProduct
      ),
    })
  ),
  on(
    ProductsAPIActions.productUpdatedFail,
    (state, { message }): ProductsState => ({
      ...state,
      loading: false,
      errorMessage: message,
    })
  ),
  on(
    ProductsPageActions.deleteProduct,
    (state): ProductsState => ({
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(
    ProductsAPIActions.productDeletedSuccess,
    (state, { id }): ProductsState => ({
      ...state,
      loading: false,
      products: state.products.filter((existingProduct) => existingProduct.id !== id),
    })
  ),
  on(
    ProductsAPIActions.productDeletedFail,
    (state, { message }): ProductsState => ({
      ...state,
      loading: false,
      errorMessage: message,
    })
  )
);
