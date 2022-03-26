let setDdTitle = (title) => {
  document.title = title;
  // eslint-disable-next-line no-undef
  if (dd.ios || dd.android) {
    // dd.ready(function() {
    // eslint-disable-next-line no-undef
    dd.biz.navigation.setTitle({
      title: title,
      // onSuccess: function(result) {
      //     // alert('succcess')
      // },
      // onFail: function(err) {}
    })
    // });
  }

}


export default setDdTitle