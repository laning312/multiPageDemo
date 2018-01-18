import Vue from 'vue'
import Test from './Test.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#test',
  components: { Test },
  template: '<Test/>'
})
