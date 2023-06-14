import { Module } from "vuex";

interface FavoriteState {
  favoriteItems: any[];
}

const favoriteModule: Module<FavoriteState, any> = {
  state: {
    favoriteItems: JSON.parse(localStorage.getItem("favorites") || "[]"),
  },
  mutations: {
    addToFavorites(state, item) {
      state.favoriteItems.push(item);
      localStorage.setItem("favorites", JSON.stringify(state.favoriteItems));
    },
    removeFromFavorites(state, item) {
      state.favoriteItems = state.favoriteItems.filter(
        (favorite) => favorite.id !== item.id
      );
      localStorage.setItem("favorites", JSON.stringify(state.favoriteItems));
    },
  },
  getters: {
    favoriteItemCount(state) {
      return state.favoriteItems.length;
    },
    favoriteItemData(state) {
      return state.favoriteItems;
    },
    isItemInFavorites: (state) => (item: any) => {
      return state.favoriteItems.some((favorite) => favorite.id === item.id);
    },
  },
};

export default favoriteModule;
