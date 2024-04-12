import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootSlice } from 'store/rootState';
import { ProductResponseI } from 'types/response/productResponse';

export interface IProduct {
  products: ProductResponseI[] | [];
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
  } as IProduct,
  reducers: {
    getProductRequest: () => {},
    getProductRequestSuccess: (
      state,
      action: PayloadAction<ProductResponseI[]>
    ) => {
      state.products = action.payload.filter(
        (item) =>
          item.category === "men's clothing" ||
          item.category === "women's clothing"
      );
    },
    getProductRequestFailure: (state) => {},
  },
});

export const productSliceSelector = (state: IRootSlice) => state.products;

export const {
  getProductRequest,
  getProductRequestSuccess,
  getProductRequestFailure,
} = ProductSlice.actions;

export default ProductSlice.reducer;
