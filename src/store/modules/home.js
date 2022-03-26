// import { getTypeList } from "@/api/vacation";

const module = {
  namespaced: true,
  state: {
    myRecord: null, // 法定节假日明细
    scrollTop: null, // 滚动条位置
    fromTab: null, // 异常数据tab列表
  },
  mutations: {
    setmyRecord(state, data) {
      console.log(data);
      state.myRecord = data
    },
    setScrollTop(state, data) {
      state.scrollTop = data
    },
    setFromTab(state, data) {
      state.fromTab = data
    },
  },
  actions: {},
  module: {},
  getters: {}
}
export default module