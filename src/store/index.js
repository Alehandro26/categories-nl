import { createStore } from "vuex";
import { getMenuTags } from "@/api";

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
      return (state.idCity ?? +localStorage.getItem(state.nameIdStorage)) || 1;
    },
  },
  actions: {
    writeIdCity({ state, commit }, id) {
      localStorage.setItem(state.nameIdStorage, id);
      commit("setIdCity", id);
    },
    async getTags({ commit }, id) {
      const { tags } = await getMenuTags(id);
      commit("setTags", tags);
    },
  },
});
