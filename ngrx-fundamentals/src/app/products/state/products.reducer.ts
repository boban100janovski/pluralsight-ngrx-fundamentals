import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../product.model';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { ProductsState } from './products.state';

export const adapter = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: '',
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state): ProductsState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(
    ProductsPageActions.loadProducts,
    (state): ProductsState => ({
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) =>
    adapter.addMany(products, {
      ...state,
      loading: false,
    })
  ),
  on(
    ProductsAPIActions.productsLoadedFail,
    (state, { message }): ProductsState => ({
      ...state,
      loading: false,
      errorMessage: message,
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
  on(
    ProductsAPIActions.productAddedSuccess,
    (state, { product }): ProductsState =>
      adapter.addOne(product, {
        ...state,
        loading: false,
        errorMessage: '',
      })
  ),
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
    (state, { update }): ProductsState =>
      adapter.updateOne(update, {
        ...state,
        loading: false,
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
    (state, { id }): ProductsState =>
      adapter.removeOne(id, {
        ...state,
        loading: false,
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
