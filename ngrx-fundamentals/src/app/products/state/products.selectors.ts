import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>(Features.Products);

export const selectProductsLoading = createSelector(selectProductsState, ({ loading }) => loading);

export const selectProducts = createSelector(selectProductsState, ({ products }) => products);

export const selectProductsShowProductCode = createSelector(
  selectProductsState,
  ({ showProductCode }) => showProductCode
);

export const selectProductsTotal = createSelector(selectProducts, sumProducts);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (state) => state.errorMessage
);

export const { selectRouteParams } = getRouterSelectors();

// export const selectProductById = createSelector(
//   selectRouteParams,
//   selectProductsState,
//   ({ id }, { products }) => products.find((product) => product.id === parseInt(id))
// );

export const selectProductById = (id: string) =>
  createSelector(selectProducts, (products) =>
    products.find((product) => product.id === parseInt(id))
  );
