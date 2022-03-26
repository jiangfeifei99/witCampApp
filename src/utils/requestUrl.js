let requestUrl = {
  mdImg: '',
  baseURL: ''
}
if (process.env.NODE_ENV === 'development') {//本地开发地址
  // requestUrl.mdImg = 'http://39.96.93.185:26020'

  // requestUrl.baseURL = 'http://39.96.93.185:26020/smart-camp-admin'

  // requestUrl.mdImg = 'http://localhost:8000'
  // requestUrl.baseURL = 'http://localhost:8000/smart-camp-admin'
  requestUrl.mdImg = 'http://172.20.1.105:8000'
  requestUrl.baseURL = 'http://172.20.1.105:8000/smart-camp-admin'

  // requestUrl.mdImg = 'https://xf.sanspartner.com'
  // requestUrl.baseURL = 'https://xf.sanspartner.com/zhyq/smart-camp-admin'


} else if (process.env.NODE_ENV === 'production') {

  if (process.env.VUE_APP_FLAG === 'test') {//测试地址

    requestUrl.mdImg = 'http://39.96.93.185:26020'

    requestUrl.baseURL = 'http://39.96.93.185:26020/smart-camp-admin'

  } else {//正式地址
    requestUrl.mdImg = 'https://xf.sanspartner.com/zhyq'
    requestUrl.baseURL = 'https://xf.sanspartner.com/zhyq/smart-camp-admin'
  }
}

export default requestUrl