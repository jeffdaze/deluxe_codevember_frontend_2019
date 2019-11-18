import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    funds: 0
  },
  mutations: {
    addFunds (state: any, amount: number): void {
      state.funds += amount;
    },
    deleteFunds (state: any, amount: number): void {
      state.funds -= amount;
    }
  },
  actions: {

  },
  getters: {
    getFunds (state: any): number {
      return state.funds;
    }
  }
});
