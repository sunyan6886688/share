import request from '../utils/request';
// 获取区域列表
export async function userLogin(params) {
  return request('usr/userLogin', {
    method: 'POST',
    body:params,
  });
}