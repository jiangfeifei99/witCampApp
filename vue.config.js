// const path = require('path')
// const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  publicPath: './', //vueConf.baseUrl, // 根域上下文目录
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5, //基准值(计算公式：设计图宽度/10)，设计图尺寸为750X1134(iPhone6)，基准值为750/10=75
            propList: ['*'],
            selectorBlackList: ['van']
          })
        ]
      }
    }
  },
  devServer: {
    // disableHostCheck: false,
    host: "0.0.0.0",
    // port: 9999,
    // https: false,
    // hotOnly: false,
    // proxy: null
    //development server port 8000
    //port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.1.127:8088/ding_leave',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
}

