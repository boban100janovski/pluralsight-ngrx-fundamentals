import { EntityState } from '@ngrx/entity';
import { Product } from '../product.model';

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}
