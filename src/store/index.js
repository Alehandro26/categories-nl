import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      nameIdStorage: "idCity",
      idCity: null,
      tags: null,
    };
  },
  mutations: {
    setIdCity(state, id) {
      state.idCity = id;
    },
    setTags(state, tags) {
      state.tags = tags;
    },
  },
  getters: {
    recordedIdCity(state) {
      return state.idCity ?? +localStorage.getItem(state.nameIdStorage);
    },
  },
  actions: {
    writeIdCity({ state, commit }, id) {
      localStorage.setItem(state.nameIdStorage, id);
      commit("setIdCity", id);
    },
  },
});
