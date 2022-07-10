import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = () => ({
  collapse: false,
});
const getters = {
  collapse: (state) => state.collapse,
};

const mutations = {
  changeCollapse: (state) => {
    state.collapse = !state.collapse;
  },
};
const actions = {
  changeCollapse({ commit }) {
    commit("changeCollapse");
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
