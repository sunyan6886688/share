
import { message } from 'antd';
import {
  getStoreList,
  getHotStoreList,
  getAllAppHotStores,
  getBrandInfo4App,
  getStoreListByBrandId4App,
  getAllUsedTags
} from '@/services/storeList';
export default {
  namespace: 'storelist',
  state: {
   
  },

  effects: {
    // 获取门店列表
    *getStoreList({payload},{call,put}){
      const response =yield call(getStoreList,payload);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveStoreList',
          payload:response
        })
      }
    },
    // 获取人气商家
    *getHotStoreList(_,{call,put}){
      const response =yield call(getHotStoreList,_);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveHotStoreList',
          payload:response
        })
      }
    },
    // 获取全部的商家列表
    *getAllAppHotStores({payload},{call,put}){
      const response =yield call(getAllAppHotStores,payload);
      if(response.code==200){
        yield put({
          type:'saveAllAppHotStores',
          payload:response
        })
      }
      return response
    },
    // 获取品牌信息
    *getBrandInfo4App({payload},{call,put}){
      const response =yield call(getBrandInfo4App,payload);
      if(response.code==200){
        yield put({
          type:'saveBrandInfo4App',
          payload:response
        })
      }
    },
    *getStoreListByBrandId4App({payload},{call,put}){
      const response =yield call(getStoreListByBrandId4App,payload);
      if(response.code==200){
        yield put({
          type:'saveStoreListByBrandId4App',
          payload:response
        })
      }
    },
    // 获取门店标签
    *getAllUsedTags(_,{call,put}){
      const response =yield call(getAllUsedTags,_);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveAllUsedTags',
          payload:response
        })
      }
    },
    *clearStroeList(_, { put }) {
      yield put({
        type: 'clearSList'
      })
    },
  },
  
  reducers: {
    // 获取门店列表
    saveStoreList(state,response){
      return{
        ...state,
        StoreList:response.payload.result.appStores,
        haveNext:response.payload.result.haveNext,
        
      }
    },
    // 获取人气商家
    saveHotStoreList(state,response){
      return{
        ...state,
        HotStoreList:response.payload.result.storeList
      }
    },
    saveAllAppHotStores(state,response){
      return{
        ...state,
        AllAppHotStores:response.payload.result,
        haveNext:response.payload.result.haveNext,
        
      }
    },
    // 获取品牌信息
    saveBrandInfo4App(state,response){
      return{
        ...state,
        BrandInfo4App:response.payload.result.brandInfoVo
      }
    },
    saveStoreListByBrandId4App(state,response){
      return{
        ...state,
        StoreListByBrandId4App:response.payload.result.appStores
      }
    },
    saveAllUsedTags(state,response){
      return{
        ...state,
        AllUsedTags:response.payload.result.productTagInfoBos
      }
    },
    clearSList(state) {
      return {
        ...state,
        StoreList: null,
        haveNext: true,
      }
    }
  },
};
