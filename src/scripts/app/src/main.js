import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    doneColumns: [],
    columns: [],
    labels: [],
  }
})

/* eslint-disable no-new */
window.eventBus = new Vue()

new Vue({
  el: '#app',
  render: h => h(App)
})
