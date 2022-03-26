// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import router from './router'
import store from './store'
import DD from './utils/ddapi' // global filter
import { setDocumentTitle } from '@/utils/domUtil'

router.beforeEach((to, from, next) => {
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(to.meta))
  if (to.name != 'home') {
    // 导航栏右则按钮
    DD.setMenu(
      [
        {
          id: "1",
          text: "更多",
        },
      ],
      (data) => {
        if (data.id == 1) DD.share({ type: 0 });
      }
    );
  }
  if (!Vue.ls.get('USER')) {
    store.dispatch('GetUserInfo').then(() => {
      next()
    })
  } else {
    next()
  }
  // next()
})

router.afterEach(() => {
  if (document.getElementById('loading')) {
    document.body.removeChild(document.getElementById('loading'))
  }
})