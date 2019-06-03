import request from '@/utils/request';
// 获取门店列表
export async function getStoreList(params) {
  return request('org/get_app_store_list', {
    method: 'POST',
    body:params,
  });
}
// 获取人气商家门店列表
export async function getHotStoreList(params) {
    return request('org/getAppHotStores', {
      method: 'POST',
      body:params,
    });
  }
  // 获取全部的商家列表
  export async function getAllAppHotStores(params) {
    return request('org/getAllAppHotStores', {
      method: 'POST',
      body:params,
    });
  }
  
 // 获取品牌信息
 export async function getBrandInfo4App(params) {
  return request('org/getBrandInfo4App', {
    method: 'POST',
    body:params,
  });
}
// 获取品牌信息产品
export async function getStoreListByBrandId4App(params) {
  return request('org/getStoreListByBrandId4App', {
    method: 'POST',
    body:params,
  });
}
// 获取品牌信息产品
export async function getAllUsedTags(params) {
  return request('org/getAllUsedTags', {
    method: 'POST',
    body:params,
  });
}
