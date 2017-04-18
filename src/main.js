// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueShortkey from 'vue-shortkey'
import App from './App'
import VueRouter from './router'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueShortkey)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: VueRouter,
  template: '<App/>',
  components: { App }
})
