import Vue from 'vue'
import Admin from './Admin.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  components: { Admin },
  template: '<Admin/>'
})
