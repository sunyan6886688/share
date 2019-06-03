
import { message } from 'antd';
import {
  queryAareByParentCode,
  appGetHomeLabelList,
  getAppBanners,
  queryStore,
  createSignature,
  getAppHomeMoreStoreList
} from '@/services/home';
export default {
  namespace: 'home',

  state: {
    status: undefined,
  },

  effects: {
    // 获取区域列表
    *queryAareByParentCode({ payload }, { call, put }) {
      const response = yield call(queryAareByParentCode, payload);
      if (response.code == 200) {
        const areaCode =  response.result.pubAreaBoList.length>0?response.result.pubAreaBoList.filter(item => {
          return item.areaName == localStorage.getItem('UserCity') + '市'
        }):[]
        localStorage.setItem('UserCityCode',areaCode.length>0? areaCode[0].areaCode:'330100')
        yield put({
          type: 'saveAareByParentCode',
          payload: response,
        });
      }
      return response

    },
    
    //获取首页标签
    *appGetHomeLabelList(_,{call,put}){
      const response =yield call(appGetHomeLabelList,_);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveHomeLableList',
          payload:response
        })
      }
    },
    // 首页banner
    *getAppBanners(_,{call,put}){
      const response =yield call(getAppBanners,_);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveAppBanners',
          payload:response
        })
      }
    },
    // 首页门店
    *queryStore({payload},{call,put}){
      const response =yield call(queryStore,payload);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveStore',
          payload:response
        })
      }
    },
    // 首页门店查看更多
    *getAppHomeMoreStoreList({payload},{call,put}){
      const response =yield call(getAppHomeMoreStoreList,payload);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveAppHomeMoreStoreList',
          payload:response
        })
      }
    },
    *clearStroeList(_, { put }) {
      yield put({
        type: 'clearSList'
      })
    },
    // 获取签名
    *createSignature(_,{call,put}){
      const response =yield call(createSignature,_);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'savecreateSignature',
          payload:response
        })
      }
    }
  },

  reducers: {
    // 获取区域列表数据处理
    saveAareByParentCode(state, response) {
      return {
        ...state,
        AareByParentCode: response.payload.result,
      };
    },
    // 请求banner list数据处理
    saveBanner(state, response) {
      return {
        ...state,
        BannerList: response.payload.result,
      };
    },
    // 请求homeLableList数据处理
    saveHomeLableList(state,response){
      return{
        ...state,
        HomeLableList:response.payload.result.appHomeLabelInfoVoList
      }
    },
    // 首页banner
    saveAppBanners(state,response){
      return{
        ...state,
        AppBanners:response.payload.result.banners
      }
    },
    // 首页门店
    saveStore(state,response){
      return{
        ...state,
        HomeStore:response.payload.result.appHomeStoreVoList,
        haveNext:response.payload.result.haveNext,
        
      }
    },
    saveAppHomeMoreStoreList(state,response){
      return{
        ...state,
        MoreHomeStore:response.payload.result.appHomeStoreVoList,
        haveNext:response.payload.result.haveNext,
      }
    },
    savecreateSignature(state,response){
      return{
        ...state,
        createSignature:response.payload.result
      }
    },
    clearSList(state) {
      return {
        ...state,
        HomeStore: null,
        haveNext: true,
      }
    }
  },
};
