
import { Toast } from 'antd';
import {
  register,
  checkCardNo
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
    }
   
  },

  reducers: {
    
  }
};
