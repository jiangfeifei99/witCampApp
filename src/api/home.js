import { axios } from '@/utils/request'

/**
*查询自己的酒检记录
* @param parameter
* @returns {*}
*/

export function myFaceRecord(params) {
  return axios({
    url: '/app/myFaceRecord',
    method: "get",
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
*查询自己的酒检记录统计
* @param parameter
* @returns {*}
*/

export function myFaceRecordStatistics(params) {
  return axios({
    url: '/app/myFaceRecordStatistics',
    method: "get",
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
*酒检统计
* @param parameter
* @returns {*}
*/

export function faceRecordStatistics(params) {
  return axios({
    url: '/app/faceRecordStatistics',
    method: "get",
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
*酒检统计详情
* @param parameter
* @returns {*}
*/

export function faceRecordStatisticsDetail(params) {
  return axios({
    url: '/app/faceRecordStatisticsDetail',
    method: "get",
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/**
*酒检统计详情部门列表
* @param parameter
* @returns {*}
*/

export function faceRecordStatisticsDetailDept(params) {
  return axios({
    url: '/app/faceRecordStatisticsDetailDept',
    method: "get",
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}