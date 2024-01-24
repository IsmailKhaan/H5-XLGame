import Vue from 'vue'
import Vuex, { Store } from 'vuex'
Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import state from './state'



const store = new Vuex.Store({
    getters,
    mutations,actions,state
})
export default store
