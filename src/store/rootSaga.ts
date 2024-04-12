import { fork } from 'redux-saga/effects';
import productSaga from 'store/saga/productSaga';

export default function* rootSaga() {
  yield fork(productSaga);
}
