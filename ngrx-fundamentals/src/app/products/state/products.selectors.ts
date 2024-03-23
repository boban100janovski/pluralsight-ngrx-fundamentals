import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>(Features.Products);

export const selectProducts = createSelector(selectProductsState, (state) => state.products);

export const selectProductsLoading = createSelector(selectProductsState, (state) => state.loading);

export const selectProductsShowProductsCode = createSelector(
  selectProductsState,
  (state) => state.showProductCode
);

export const selectProductsTotal = createSelector(selectProducts, sumProducts);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (state) => state.errorMessage
);
