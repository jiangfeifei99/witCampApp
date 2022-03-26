import { axios } from '@/utils/request'

/**
*查询自己的刷脸门禁记录
* @param parameter
* @returns {*}
*/

export function myFaceRecord(params) {
  return axios({
    url: '/swipingFaceInOutAccess/getSwipingFaceInOutAccess',
    method: "get",
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}