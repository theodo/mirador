import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
window.eventBus = new Vue()

new Vue({
  el: '#app',
  render: h => h(App)
})
