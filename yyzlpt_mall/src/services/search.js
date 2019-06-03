import request from '../utils/request';
// 搜索页热门搜索
export async function getAppKeyWordList() {
  return request('opt/getAppKeyWordList', {
    method: 'POST',
    body: {},
  });
}
export async function searchList(params) {
  return request('search/searchHomeSearch', {
    method: 'POST',
    body: params
  });
}
