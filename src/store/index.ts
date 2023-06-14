import { createStore } from "vuex";
import comicsModule from "./comics";
import favoriteModule from "./favorite";

export default createStore({
  modules: {
    comicsModule,
    favorites: favoriteModule,
  },
});
