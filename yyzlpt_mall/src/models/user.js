
import { Toast } from 'antd';
import {
  register,
  checkCardNo,
  userLogin
} from '@/services/user';
export default {
  namespace: 'user',

  state: {},

  effects: {
    *checkCardNo({ payload }, { call }) {
      const response = yield call(checkCardNo, payload);
      return response;
    },

    *register({ payload }, { call }) {
      const response = yield call(register, payload);
      return response;
    },
   
       // 获取区域列表
    *userLogin({ payload }, { call, put }) {
        const response = yield call(userLogin, payload)
        return response
  
      },
    
  },

  reducers: {

  }
};
