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

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();

export const selectProductById = createSelector(
  selectRouteParams,
  selectProductsState,
  ({ id }, { products }) => products.find((product) => product.id === parseInt(id))
);
