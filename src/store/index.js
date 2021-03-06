import Vue from 'vue'
import Vuex from 'vuex'

import calendar from './modules/calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    calendar
  }
})
