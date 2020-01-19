'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8210"', //nginx反向代理地址
  OSS_PATH: '"https://1916-file.oss-cn-beijing.aliyuncs.com"' //oss域名地址
})
// 
// https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin