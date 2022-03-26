import Vue from 'vue'
import axios from 'axios'
// import store from '@/store'
import { VueAxios } from './axios'
import requestUrl from '@/utils/requestUrl'
import { Toast } from 'vant';

Vue.use(Toast);

//创建 axios 实例
const service = axios.create({
  baseURL: requestUrl.baseURL, // api base_url
  withCredentials: true, // 默认的
  //baseURL: '/api', // api base_url   因为有跨域，所以请求代理时，开启？
  timeout: 600000 // 请求超时时间
})



const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get('USER').data.token
    if (error.response.status === 403) {

      Toast.fail('权限不足');
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {

      Toast.fail('授权验证失败');
      if (token) {
        /*store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })*/
      }
    }

  }
  return Promise.reject(error)
}


// 拦截重复请求(即当前正在进行的相同请求)
const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}


// request interceptor
service.interceptors.request.use(config => {
  // 拦截重复请求(即当前正在进行的相同请求)
  let requestData = getRequestIdentify(config, true)
  removePending(requestData, true)
  config.cancelToken = new CancelToken((c) => {
    pending[requestData] = c
  })
  config.headers['x-requested-with'] = 'XMLHttpRequest'
  const token = Vue.ls.get('USER')
  if (token && token.data && token.data.token) {
    // config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers['token'] = token.data.token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  //  把已经完成的请求从 pending 中移除
  const code = response.data.code
  if (code == 500) {
    Toast.fail(response.data.msg);
  }
  let requestData = getRequestIdentify(response.config)
  removePending(requestData)
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
