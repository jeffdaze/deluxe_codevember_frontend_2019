import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    funds: 0,
    jobSelected: {},
    userSelected: {}
  },
  mutations: {
    addFunds (state: any, amount: number): void {
      state.funds += amount;
    },
    deleteFunds (state: any, amount: number): void {
      state.funds -= amount;
    },

    setJob (state: any, job: any): void {
      state.jobSelected = job;
    },
    unsetJob (state: any): void {
      state.jobSelected = {};
    },

    setUser (state: any, user: any): void {
      state.userSelected = user;
    },
    unsetUser (state: any): void {
      state.userSelected = {};
    }
  },
  actions: {

  },
  getters: {
    getFunds (state: any): number {
      return state.funds;
    },

    getCurrentUser (state: any): any {
      return state.userSelected;
    },

    getCurrentJob (state: any): any {
      return state.jobSelected;
    }

  }
});
