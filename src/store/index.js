
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import indexstore from './indexstore'
  
const store = new Vuex.Store({
    modules: {
        index: indexstore,
    }
})

export default store