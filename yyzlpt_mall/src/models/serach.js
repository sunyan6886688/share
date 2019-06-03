
import { message } from 'antd';
import {
  getAppKeyWordList,
  searchList
} from '@/services/search';
export default {
  namespace: 'search',

  state: {
   
  },

  effects: {
    // 搜索页热门搜索
    *getAppKeyWordList({payload},{call,put}){
      const response =yield call(getAppKeyWordList,payload);
      console.log(response)
      if(response.code==200){
        yield put({
          type:'saveAppKeyWordList',
          payload:response
        })
      }
    },
    // 搜索列表
    *searchList({payload},{call,put}){
      const response =yield call(searchList,payload);
      console.log(response, payload)
      if(response.code==200){
        yield put({
          type:'savesearchList',
          payload: response,
          searchType: payload.searchType,
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
    // 搜索页热门搜索
    saveAppKeyWordList(state,response){
      return{
        ...state,
        AppKeyWordList:response.payload.result.keyWords
      }
    },
    // 搜索列表
    savesearchList(state, response){
      let haveNext; searchList;
      if (response.searchType == 0) {
        haveNext = false;
      } else if (response.searchType == 1) {
        const list = response.payload && response.payload.result && response.payload.result.storeInfoList; 
        haveNext = list && list.length === 10;
      } else if (response.searchType == 2) {
        const list = response.payload && response.payload.result && response.payload.result.offerInfoList; 
        haveNext = list && list.length === 10;
      }
      return{
        ...state,
        searchList:response.payload.result,
        haveNext,
      }
    },
    clearSList(state) {
      return {
        ...state,
        searchList: null,
        haveNext: true,
      }
    }

  },
};
