import Vue from "vue";
import Vuex from "vuex";

import * as firebase from "./modules/firebase";
import * as local from "./modules/local";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { firebase, local },
  state: {
    notes: [],
    storeMethod: "firebase" // firebase|local"
  },
  mutations: {
    SET_NOTES(state, payload) {
      state.notes = payload;
    },
    SET_STORE_METHOD(state, payload) {
      state.storeMethod = payload;
    }
  },
  actions: {
    changeStoreMethod({ commit }, payload) {
      commit("SET_STORE_METHOD", payload);
    }
  },
  getters: {
    notes: state => state.notes,
    storeMethod: state => state.storeMethod
  }
});
