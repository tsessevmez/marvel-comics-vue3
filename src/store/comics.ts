import { Module } from "vuex";

interface comicsState {
  comicsItems: any[]; // Kullanımınıza göre uygun veri tipini tanımlayın
}

const comicsModule: Module<comicsState, any> = {
  state: {
    comicsItems: [],
  },
  mutations: {
    addTocomics(state, item) {
      state.comicsItems.push(item);
    },
  },
  actions: {
    addTocomics({ commit }, item) {
      commit("addTocomics", item);
    },
  },
  getters: {
    comicsItemCount(state) {
      return state.comicsItems.length;
    },
  },
};

export default comicsModule;
