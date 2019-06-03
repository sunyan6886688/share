import request from '../utils/request';
// 获取区域列表
export async function queryAareByParentCode(params) {
  return request('pub/queryAareByParentCode', {
    method: 'POST',
    body:params,
  });
}
// 获取homeLableList
export async function appGetHomeLabelList() {
  return request('opt/appGetHomeLabelInfoList', {
    method: 'POST',
    body: {},
  });
}
// 获取homeBanner
export async function getAppBanners() {
  return request('opt/getAppBanners', {
    method: 'POST',
    body: {},
  });
  // return request('opt/getAppBanners');
}

// 获取首页门店
export async function queryStore(params) {
  return request('org/getAppHomeStoreList', {
    method: 'POST',
    body: params,
  });
}
// 获取首页门店
export async function getAppHomeMoreStoreList(params) {
  return request('org/getAppHomeMoreStoreList', {
    method: 'POST',
    body: params,
  });
}
//获取签名

export async function createSignature(params) {
  return request('app/createSignature', {
    method: 'GET',
  });
}