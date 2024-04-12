import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getProductRequestFailure,
  getProductRequestSuccess,
} from 'store/slices/productSlice';
import { productApi } from 'api';
import { ProductResponseI } from 'types/response/productResponse';

function* getProductRequestSaga() {
  try {
    const response: ProductResponseI[] = yield call(() =>
      productApi.getProductRequest('')
    );
    if (response) {
      yield put(getProductRequestSuccess(response));
    } else {
      yield put(getProductRequestFailure());
    }
  } catch (error) {
    console.error('error in get product request ', error);
  }
}

function* userSaga() {
  yield takeEvery('product/getProductRequest', getProductRequestSaga);
}

export default userSaga;
