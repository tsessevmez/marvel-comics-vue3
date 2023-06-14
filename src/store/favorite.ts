import { Module } from "vuex";

// Favori öğelerin durumunu tanımlayan arayüz
interface FavoriteState {
  favoriteItems: any[]; // Favori öğelerin dizi olarak tutulduğu alan
}

// Vuex modülünü tanımlayan favori modülü
const favoriteModule: Module<FavoriteState, any> = {
  state: {
    favoriteItems: JSON.parse(localStorage.getItem("favorites") || "[]"), // Başlangıç durumu, localStorage'dan favori öğeleri getiriyor
  },
  mutations: {
    // Favorilere öğe eklemek için mutasyon fonksiyonu
    addToFavorites(state, item) {
      state.favoriteItems.push(item); // Öğeyi favori öğeler dizisine ekler
      localStorage.setItem("favorites", JSON.stringify(state.favoriteItems)); // Güncellenmiş favori öğelerini localStorage'a kaydeder
    },
    // Favorilerden öğe çıkarmak için mutasyon fonksiyonu
    removeFromFavorites(state, item) {
      state.favoriteItems = state.favoriteItems.filter(
        (favorite) => favorite.id !== item.id
      ); // Öğeyi favori öğeler dizisinden filtreler
      localStorage.setItem("favorites", JSON.stringify(state.favoriteItems)); // Güncellenmiş favori öğelerini localStorage'a kaydeder
    },
  },
  getters: {
    // Favori öğe sayısını hesaplayan getter fonksiyonu
    favoriteItemCount(state) {
      return state.favoriteItems.length;
    },
    // Tüm favori öğelerini döndüren getter fonksiyonu
    favoriteItemData(state) {
      return state.favoriteItems;
    },
    // Belirli bir öğenin favorilerde olup olmadığını kontrol eden getter fonksiyonu
    isItemInFavorites: (state) => (item: any) => {
      return state.favoriteItems.some((favorite) => favorite.id === item.id);
    },
  },
};

export default favoriteModule;
