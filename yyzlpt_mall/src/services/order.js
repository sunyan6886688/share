import request from '@/utils/request';
//   "patientCard": "41108119950516258X"
// 获取token值
export async function appUserLogin(params) {
  return request('user/appUserLogin', {
    method: 'POST',
    body: params,
  })
}
// 根据token获取app用户信息
export async function getAppUserInfoByToken(params) {
  return request('user/getH5UserInfoByToken', {
    method: 'POST',
    body: params,
  });
}
// app查询通用服务订单列表
export async function appGetCommonOrderList(params) {
  return request('ord/appGetCommonOrderList', {
    method: 'POST',
    body: params,
  });
}
// app查询通用服务订单详情
export async function appQueryCommonOrderInfo(params) {
  return request('ord/appQueryCommonOrderInfo', {
    method: 'POST',
    body: params,
  });
}
// 预约通用服务
export async function bookingCommonOrder(params) {
  return request('ord/bookingCommonOrder', {
    method: 'POST',
    body: params,
  });
}
// 取消通用服务订单
export async function cancelCommonOrder(params) {
  return request('ord/appCancelCommonOrder', {
    method: 'POST',
    body: params,
  });
}
// 获取客户端商品详情
export async function getGoodsDataByGoodsId(params) {
  return request('prd/getGoodsDataByGoodsId', {
    method: 'POST',
    body: params,
  });
}
// 获取token
export async function login(params) {
  return request('user/hfive/login', {
    method: 'POST',
    body: params,
  });
}
// 获取预览商品详情内容
export async function getPreviewGoodDetail(params) {
  return request('/prd/getPreviewProduct', {
    method: 'POST',
    body: params,
  });
}
