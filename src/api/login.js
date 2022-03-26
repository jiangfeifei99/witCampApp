import { axios } from '@/utils/request'

/**
 * JSAPI鉴权
 * @param parameter
 * @returns {*}
 * @constructor
 */
export function getToken(params) {
  return axios({
    url: '/auth/sign',
    method: 'get',
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 登陆
 * @param parameter
 * @returns {*}
 * @constructor
 */
export function getLogin(params) {
  return axios({
    url: '/auth/login',
    method: 'get',
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
