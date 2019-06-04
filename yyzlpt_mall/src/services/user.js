import request from '@/utils/request';

// 注册
export async function register(params) {
    return request('user/register', {
        method: 'POST',
        body: params
    })
}

// 是否已注册
export async function checkCardNo(params) {
    return request('user/checkCardNo', {
        method: 'POST',
        body: params
    })
}

export async function getCode(params) {
    // return request('user/checkCardNo', {
    //     method: 'POST',
    //     body: params
    // })
}