import Vue from 'vue'

export const setDocumentTitle = function (meta) {
  document.title = meta.title;
  Vue.prototype.$dd.setTitle(meta.title)
}


