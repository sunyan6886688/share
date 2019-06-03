
import { message } from 'antd';
import router from 'umi/router';
import {
  getStoreInfo,
  getAppHotOffers,
  getCategorys,
  getProductTags,
  getProductList
} from '@/services/store';
export default {
  namespace: 'store',
  state: {
    haveNext: true,
  },

  effects: {
    // 获取门店信息
    *getStoreInfo({ payload }, { call, put }) {
      const response = yield call(getStoreInfo, payload);
      console.log(response)
      if (response.code == 200) {
        yield put({
          type: 'saveStoreInfo',
          payload: response
        })
        return response
      }else{
        router.goBack()
      }
    },
    // 获取门店热门商品
    *getAppHotOffers({ payload }, { call, put }) {
      const response = yield call(getAppHotOffers, payload);
      console.log(response)
      if (response.code == 200) {
        yield put({
          type: 'saveAppHotOffers',
          payload: response
        })
      }
    },
    // 获取所有分类
    *getCategorys({ payload }, { call, put }) {
      const response = yield call(getCategorys, payload);
      console.log(response)
      if (response.code == 200) {
        yield put({
          type: 'saveCategorys',
          payload: response
        })
      }
    },
    // 获取产品标签
    *getProductTags({ payload }, { call, put }) {
      const response = yield call(getProductTags, payload);
      console.log(response)
      if (response.code == 200) {
        yield put({
          type: 'saveProductTags',
          payload: response
        })
      }
    },
    // 获取产品列表
    *getProductList({ payload }, { call, put }) {
      const response = yield call(getProductList, payload);
      console.log(response)
      if (response.code == 200) {
        yield put({
          type: 'saveProductList',
          payload: response
        })
      }
    },
    // 清空产品列表
    *clearProductList(_, { put }) {
      yield put({
        type: 'clearPList'
      })
    },
  },

  reducers: {
    // 获取门店列表
    saveStoreInfo(state, response) {
      return {
        ...state,
        StoreInfo: response.payload.result
      }
    },
    // 获取门店热门产品
    saveAppHotOffers(state, response) {
      return {
        ...state,
        AppHotOffers: response.payload.result.offerVos
      }
    },
    //获取分类
    saveCategorys(state, response) {
      return {
        ...state,
        Categorys: response.payload.result.categoryInfoBos
      }
    },
    saveProductTags(state, response) {
      return {
        ...state,
        ProductTags: response.payload.result.productTagInfoBos
      }
    },
    saveProductList(state, response) {
      return {
        ...state,
        ProductList: response.payload.result.productInfos,
        haveNext:response.payload.result.haveNext,
      }
    },
    clearPList(state) {
      return {
        ...state,
        ProductList: null,
        haveNext: true,
      }
    }
  },
};
