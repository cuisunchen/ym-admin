import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

import * as filters from './filters' // global filters

import { orderNoPass, orderDown, orderPass, imgUpload } from '@/api/orderHandle'
// Vue.prototype.orderNoPass = orderNoPass
Vue.prototype.$orderPass = orderPass
Vue.prototype.$orderNoPass = orderNoPass
Vue.prototype.$orderDown = orderDown
Vue.prototype.$imgUpload = imgUpload

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

console.log(process.env.VUE_APP_BASE_API)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})