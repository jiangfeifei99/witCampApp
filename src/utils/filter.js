import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('daysJs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm') {
  return moment(dataStr).format(pattern)
})
// Vue.filter("status", data => {
//   var status = ''
//   switch (data) {
//     case 1:
//       status = "待采购"
//       break
//     case 2:
//       status = "待下单"
//       break
//     case 3:
//       status = "待发货"
//       break
//     case -1:
//       status = "审批拒绝"
//       break
//       case -2:
//         status = "已撤销"
//         break
//     case 0:
//       status = "审批中"
//       break
//     case 6:
//       status = "已完成"
//       break
//     case 7:
//       status = "已评价"
//       break
//     case "":
//       status = "全部"
//   }
//   return status
// })

// Vue.filter("estimate", data => {
//   var status = ''
//   switch (data) {
//     case "process":
//       status = "审批"
//       break
//     case "purchase":
//       status = "采购"
//       break
//     case "place":
//       status = "下单"
//       break
//     case "deliver":
//       status = "发货"
//       break
//     case "income":
//       status = "入库"
//       break
//     case "out":
//       status = "出库"
//   }
//   return status
// })