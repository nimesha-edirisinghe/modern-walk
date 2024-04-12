import { combineReducers } from 'redux';
import { IProduct } from './slices/productSlice';

import productSlice from 'store/slices/productSlice';
export interface IRootSlice {
  products: IProduct;
}

export const rootReducer = combineReducers({
  products: productSlice,
});
