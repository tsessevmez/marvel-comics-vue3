<template>
  <div>
    <div v-if="data && data.length > 0">
      <div v-for="dataDetail in data" :key="dataDetail.id">
        <v-card>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="4">
                <v-card>
                  <v-img
                    :width="300"
                    aspect-ratio="16/9"
                    cover
                    :src="
                      dataDetail.thumbnail.path +
                      '.' +
                      dataDetail.thumbnail.extension
                    "
                  ></v-img>
                  <v-btn
                    icon
                    class="icon-button"
                    @click="addOrRemoveFavorite(dataDetail)"
                  >
                    <v-icon
                      :icon="
                        isFavorite(dataDetail)
                          ? 'mdi-heart'
                          : 'mdi-heart-outline'
                      "
                    ></v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card
                  class="mx-auto"
                  max-width="600"
                  max-height="700"
                  :title="dataDetail.title"
                  :subtitle="dataDetail.format"
                  :text="dataDetail.description"
                ></v-card>
              </v-col>
              <v-col cols="12">
                <div>
                  <v-card>
                    <v-table>
                      <thead>
                        <tr>
                          <th class="text-left">Creator Name</th>
                          <th class="text-left">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="creatorsData in dataDetail.creators.items"
                          :key="creatorsData"
                        >
                          <td>{{ creatorsData.name }}</td>
                          <td>{{ creatorsData.role.toUpperCase() }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </div>
    <div v-else>
      <v-container>
        <v-row justify="center" align="center">
          <v-col>
            <Loading />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { onMounted, watch } from "vue";
// import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { getComicsDetail, data } from "./services/comicsDetail";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Loading from "../../../components/Loading.vue";

const route = useRoute();

const store = useStore();

/**
 * Verilen bir comic detayının favorilerde olup olmadığını kontrol eder.
 *
 * @param dataDetail - Kontrol edilecek comic detayı
 * @returns {boolean} - Comic detayının favorilerde olup olmadığına dair değer
 */
const isFavorite = (dataDetail) => {
  return store.getters.isItemInFavorites(dataDetail);
};

/**
 * Verilen comic detayını favorilere ekler veya favorilerden kaldırır.
 *
 * @param dataDetail - İşlem yapılacak comic detayı
 */
const addOrRemoveFavorite = (dataDetail) => {
  const isFavorite = store.getters.isItemInFavorites(dataDetail);

  if (isFavorite) {
    store.commit("removeFromFavorites", dataDetail);
  } else {
    store.commit("addToFavorites", dataDetail);
  }
};

/**
 * Sayfa yüklendiğinde çalışacak kodları içeren fonksiyon.
 * - Geçerli URL'den alınan `id` parametresini elde eder.
 * - `id` parametresi dizi ise ilk elemanını alır, değilse doğrudan kullanır.
 * @remarks
 * Bu fonksiyon, sayfa yüklendiğinde çağrılmalıdır.
 */
onMounted(() => {
  // URL'den id parametresini al
  const id: string = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;

  // id'yi tam sayıya dönüştür ve getComicsDetail fonksiyonunu çağır
  getComicsDetail(parseInt(id));
});

/**
 * `route.params.id` değiştiğinde çalışacak izleyici (watcher) fonksiyonu.
 * - Yeni `id` değerini tam sayıya dönüştürerek `getComicsDetail` fonksiyonunu çağırır.
 * @param newId - Yeni `id` değeri.
 * @remarks
 * Bu izleyici fonksiyon, `route.params.id` değiştiğinde otomatik olarak çağrılır.
 */
watch(
  () => route.params.id, // İzlenen değer: route.params.id
  (newId: string) => {
    // Yeni id değerini tam sayıya dönüştür ve getComicsDetail fonksiyonunu çağır
    getComicsDetail(parseInt(newId));
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.icon-button {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
