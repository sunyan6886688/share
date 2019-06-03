import request from '../utils/request';
// 获取门店列表
export async function getStoreInfo(params) {
  return request('org/getStoreInfo4App', {
    method: 'POST',
    body:params,
  });
}
// 获取门店热门产品列表
export async function getAppHotOffers(params) {
  return request('prd/getAppHotOffers', {
    method: 'POST',
    body:params,
  });
}
// 获取分类
export async function getCategorys(params) {
  return request('prd/getCategorys', {
    method: 'POST',
    body:params,
  });
}
// 获取商标
export async function getProductTags(params) {
  return request('prd/getProductTags', {
    method: 'POST',
    body:params,
  });
}
// 获取产品列表
export async function getProductList(params) {
  return request('prd/getProductList', {
    method: 'POST',
    body:params,
  });
}