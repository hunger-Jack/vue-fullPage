// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FullPage from './components/FullPage.vue'
import Page from './components/Page.vue'
// import router from './router'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    FullPage,Page
  },
  data: {
      bgColor: ['red', 'blue', 'yellow', 'orange'],
  }

})
