import Vue from 'vue'
import { getToken, getLogin } from '@/api/login'
// eslint-disable-next-line no-unused-vars
import userData from '@/utils/userData'
// import qs from 'qs'

const user = {
  state: {
    userInfo: '',
    menuAll: '',
    permission: '',
    newsAll: '',
  },
  mutations: {
    SET_USER(state, data) {
      state.userInfo = data
    },
  },
  actions: {
    GetUserInfo({ commit }) {
      return new Promise((resolve) => {// , reject
        new Promise((resolve) => {
          // 本地调试
            resolve(userData)
            return
          if (!Vue.ls.get('USER')) {
            Vue.prototype.$toast.loading({
              message: "加载中...",
              duration: 0, // 持续展示 toast
              forbidClick: true,
              loadingType: "spinner",
              className: 'toast-color'
            });
          }
          let url = `${window.location.href.split('/#/')[0]}/`;
          // let url = `https://xf.sanspartner.com/zhyq/app/`;
          console.log('url--->', url, Vue.prototype.$AgentId, Vue.prototype.$corpid)
          getToken({ "url": url }).then(data => {
            console.log('getToken-->', data)
            if (data.code == 0) {
              // eslint-disable-next-line no-undef
              dd.config({
                agentId: Vue.prototype.$AgentId, // 必填，微应用ID
                corpId: Vue.prototype.$corpid,// 必填，企业ID
                timeStamp: data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                signature: data.data.signature, // 必填，签名
                type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                jsApiList: [
                  'biz.user.get',
                  'device.notification.alert',
                  'biz.util.openLink',
                  'biz.contact.complexPicker',
                  'biz.cspace.preview',
                  'biz.cspace.saveFile',
                  'biz.telephone.showCallMenu',
                  'biz.navigation.setRight',
                  'device.geolocation.get',
                  'device.geolocation.start'
                ]
                // 必填，需要使用的jsapi列表，注意：不要带dd。
              })
              //   eslint-disable-next-line no-undef
              dd.ready(function () {// 必须加
                if (!Vue.ls.get('USER')) {
                  // eslint-disable-next-line no-undef
                  dd.runtime.permission.requestAuthCode({
                    corpId: Vue.prototype.$corpid,
                    onSuccess: function (result) {
                      getLogin({ 'authCode': result.code, 'isApp': true }).then(info => {
                        console.log('getLogin-->', info)
                        // info.data.name = info.data.name.replace(/\s+/g, "")
                        Vue.prototype.$toast.clear();
                        resolve(info)
                      })
                    },
                    onFail: function (err) {
                      Vue.prototype.$toast.clear();
                      console.log("getCodeErr免登的错误信息:", err)
                    }
                  });
                } else {
                  resolve(Vue.ls.get('USER'))
                }
              })
              // eslint-disable-next-line no-undef
              dd.error(function (error) {
                Vue.prototype.$toast.clear();
                errorAlert('error错误提示二:', error)
                console.log('error错误提示二:', error)
              })
            }
          })

        }).then(res => {
          Vue.prototype.$toast.clear();
          // Vue.ls.clear()
          Vue.ls.remove('USER')
          console.log('===', res)
          commit('SET_USER', res)
          Vue.ls.set('USER', res)
          resolve()
        })
        function errorAlert(type, text) { //错误信息提示
          // eslint-disable-next-line no-undef
          dd.device.notification.toast({
            icon: type, //icon样式，有success和error，默认为空 0.0.2
            text: text, //提示信息
            duration: 2, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
            delay: 0, //延迟显示，单位秒，默认0
            // onSuccess: function(result) {},
            // onFail: function(err) {}
          })
        }
      })
    }
  }
}

export default user