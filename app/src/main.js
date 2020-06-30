// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import store from './store'
import 'ol/ol.css'

import 'bootstrap/dist/css/bootstrap.css'
// import config from './config'
Vue.config.productionTip = false
/* eslint-disable */
//Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})