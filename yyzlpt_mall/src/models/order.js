import {
  appUserLogin,
  appGetCommonOrderList,
  appQueryCommonOrderInfo,
  bookingCommonOrder,
  cancelCommonOrder,
  getAppUserInfoByToken,
  getGoodsDataByGoodsId,
  login,
  getPreviewGoodDetail,
} from '@/services/order';
import router from 'umi/router';
import { message } from 'antd';
export default {
  namespace: 'order',
  state: {
    status: undefined,
  },
  effects: {
    //app用户密码登录 获取token值
    *appUserLogin({ payload }, { call, put }) {
      const response = yield call(appUserLogin, payload);

      if (response.code == 200) {
        yield put({
          type: 'saveAppUserLogin',
          payload: response,
        });
      }
    },
    // 根据token获取app用户信息
    *getAppUserInfoByToken({ payload }, { call, put }) {
      const response = yield call(getAppUserInfoByToken, payload);
      if (response.code == 200) {
        yield put({
          type: 'saveAppUserInfoByToken',
          payload: response,
        });
      }
      return response;
    },
    // app查询通用服务订单列表
    *appGetCommonOrderList({ payload }, { call, put }) {
      const response = yield call(appGetCommonOrderList, payload);
      if (response.code == 200) {
        yield put({
          type: 'saveAppGetCommonOrderList',
          payload: response,
        });
      }
      return response;
    },
    // app查询通用服务订单详情
    *appQueryCommonOrderInfo({ payload }, { call, put }) {
      const response = yield call(appQueryCommonOrderInfo, payload);
      if (response.code == 200) {
        yield put({
          type: 'saveAppQueryCommonOrderInfo',
          payload: response,
        });
      }
    },
    // 预约通用服务
    *bookingCommonOrder({ payload }, { call, put }) {
      const response = yield call(bookingCommonOrder, payload);
      if (response.code == 200) {
        yield put({
          type: 'saveBookingCommonOrder',
          payload: response,
        });
      }
      return response;
    },
    // 取消通用服务订单
    *cancelCommonOrder({ payload }, { call, put }) {
      const response = yield call(cancelCommonOrder, payload);
    },
    // 获取客户端商品详情
    *getGoodsDataByGoodsId({ payload }, { call, put }) {
      const response = yield call(getGoodsDataByGoodsId, payload);
      if (response.code == 200) {
        yield put({
          type: 'saveGoodsDataByGoodsId',
          payload: response,
        });
        return response.result;
      } else {
        router.goBack();
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response.code == 200) {
        localStorage.setItem('token', response.result.hfiveAppLogInToken);
      }
      return response;
    },
    *getPreviewGoodDetail({ payload }, { call, put }) {
      const response = yield call(getPreviewGoodDetail, payload);
      if (response.code == 200) {
        yield put({
          type: 'savePreviewGoodDetail',
          payload: response,
        });
      }
    },
  },

  reducers: {
    saveAppUserLogin(state, action) {
      return {
        ...state,
        appUserLogin: action.payload.result.token,
      };
    },
    saveAppGetCommonOrderList(state, action) {
      return {
        ...state,
        commonOrderBoList: action.payload.result.commonOrderVoList,
        commonOrderCount: action.payload.result.count,
      };
    },
    saveAppQueryCommonOrderInfo(state, action) {
      return {
        ...state,
        commonOrderBo: action.payload.result.commonOrderVo,
      };
    },
    saveBookingCommonOrder(state, action) {
      return {
        ...state,
        bookingorderId: action.payload.result,
      };
    },
    saveAppUserInfoByToken(state, action) {
      return {
        ...state,
        appUserInfoBo: action.payload.result.appUserInfoVo,
      };
    },
    saveGoodsDataByGoodsId(state, action) {
      return {
        ...state,
        productInfoImages: action.payload.result.productInfoBoById.images,
        productInfoBoById: action.payload.result.productInfoBoById,
        productInfoLogImg: action.payload.result.productInfoBoById.logImg,
      };
    },
    savePreviewGoodDetail(state, action) {
      return {
        ...state,
        previewProductInfoImages: action.payload.result.images,
        previewProductInfoBoById: action.payload.result,
        previewProductInfoLogImg: action.payload.result.logImg,
      };
    },
  },
};
