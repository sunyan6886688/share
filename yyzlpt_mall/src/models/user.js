
import { Toast } from 'antd';
import {
  register,
  checkCardNo,
  userLogin,
  getDynamicPwd
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

    //密码登录
    *userLogin({ payload }, { call, put }) {
      const response = yield call(userLogin, payload)
      return response

    },
    // 获取动态验证码
    *getDynamicPwd({ payload }, { call, put }) {
      const response = yield call(getDynamicPwd, payload)
      if(response.code=='200'){

      }
      return response

    },
  },

  reducers: {

  }
};
