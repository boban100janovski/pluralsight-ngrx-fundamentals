import { Product } from '../products/product.model';

export const sumProducts = (products: Product[]): number =>
  products.reduce((acc: number, cur) => acc + cur.price, 0);
