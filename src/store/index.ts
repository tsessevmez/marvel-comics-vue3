import { createStore } from "vuex";
import favoriteModule from "./favorite";

export default createStore({
  modules: {
    favorites: favoriteModule,
  },
});
