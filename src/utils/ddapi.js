let DD = {
  hideBar() {//隐藏钉钉原生头部
    // eslint-disable-next-line no-undef
    dd.biz.navigation.hideBar({
      hidden: true,// true：隐藏，false：显示
      // onSuccess : function(result) {
      // },
      // onFail : function(err) {}
    })
  },
  close() {//关闭浏览器
    // eslint-disable-next-line no-undef
    dd.biz.navigation.close({
      //  onSuccess : function(result) {
      //  },
      //  onFail : function(err) {}
    })
  },
  complexPicker(corpId = '', appId = '', disabledUsers, CallBack) {//通讯录选人选部门
    // eslint-disable-next-line no-undef
    dd.biz.contact.complexPicker({
      title: "请选择",            //标题
      corpId: corpId,              //企业的corpId
      multiple: false,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxUsers: 1000,            //最大可选人数
      pickedUsers: [],            //已选用户
      pickedDepartments: [],          //已选部门
      disabledUsers: disabledUsers,   //不可选用户
      disabledDepartments: [],        //不可选部门
      requiredUsers: [],            //必选用户（不可取消选中状态）
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      appId: appId,              //微应用的Id
      permissionType: "GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: false,        //返回人，或者返回人和部门
      startWithDepartmentId: 0,   //仅支持0和-1
      onSuccess: function (result) {
        /**
         {
             selectedCount:1,                              //选择人数
             users:[{"name":"","avatar":"","userid":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
             departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
         }
         */
        CallBack(result)
      },
      //  onFail : function(err) {}
    });
  },
  setTitle(title) {//设置标题
    // eslint-disable-next-line no-undef
    dd.biz.navigation.setTitle({
      title: title,//控制标题文本，空字符串表示显示默认文本
      // onSuccess : function(result) {
      //     /*结构
      //     {
      //     }*/
      // },
      // onFail : function(err) {}
    });
  },
  setMenu(items, CallBack) {//设置icon
    // eslint-disable-next-line no-undef
    dd.biz.navigation.setMenu({
      items: items,
      onSuccess: function (data) {
        CallBack(data)
      },
      // onFail: function(err) {}
    });
  },
  openLink(url) {//在新窗口上打开链接
    // eslint-disable-next-line no-undef
    dd.biz.util.openLink({
      url: url,//要打开链接的地址
      // onSuccess : function(result) {
      //     /**/
      // },
      // onFail : function(err) {}
    })
  },
  share(items) {//在新窗口上打开链接
    // eslint-disable-next-line no-undef
    dd.biz.util.share({
      items: items,
      // type: 0, //分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
      // url: String,
      // title: String,
      // content: String,
      // image: String,
      // onSuccess: function () {
      //   //onSuccess将在调起分享组件成功之后回调
      //   /**/
      // },
      // onFail: function () { },
    });
  }
}

export default DD