
import { message } from 'antd';
import {
    userLogin
} from '@/services/user';
export default {
  namespace: 'user',

  state: {
    status: undefined,
  },

  effects: {
       // 获取区域列表
    *userLogin({ payload }, { call, put }) {
        const response = yield call(userLogin, payload)
        return response
  
      },
    
  },

  reducers: {
  }
};
