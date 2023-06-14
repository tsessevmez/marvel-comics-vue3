<template>
  <div>
    <div v-if="data && data.length > 0">
      <carousel :items-to-show="3">
        <slide v-for="marvel in data" :key="marvel.id">
          <v-card
            class="mx-auto ml-4 mt-4 mr-4"
            max-width="auto"
            max-height="auto"
          >
            <v-img
              class="movies-items-image scale-img"
              :src="marvel.thumbnail.path + '.' + marvel.thumbnail.extension"
              height="auto"
            >
              <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
                <template v-slot:append>
                  <v-btn @click="addOrRemoveFavorite(marvel)" icon="$vuetify">
                    <v-btn
                      :icon="
                        isFavorite(marvel) ? 'mdi-heart' : 'mdi-heart-outline'
                      "
                    ></v-btn>
                  </v-btn>
                </template>
              </v-toolbar>
            </v-img>
            <v-card-title>
              {{ marvel.title }}
            </v-card-title>

            <v-card-actions>
              <v-btn
                color="orange-lighten-2"
                @click="goDetail(marvel.id)"
                variant="text"
              >
                Detail
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
            <!-- <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ marvel.description }}
                </v-card-text>
              </div>
            </v-expand-transition> -->
            <v-expansion-panels>
              <v-expansion-panel title="Description" :text="marvel.description">
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </slide>
      </carousel>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { getComics, data } from "./services/comics";
import { onMounted } from "vue";
import Loading from "../../../components/Loading.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
// const favoriteCount = computed(() => store.getters.favoriteItemCount);

const isFavorite = (dataDetail) => {
  return store.getters.isItemInFavorites(dataDetail);
};

/**
 * Favorilere ekleme veya favorilerden çıkarma işlemini gerçekleştirir.
 * @param dataDetail Favoriye eklenecek veya çıkarılacak veri detayı
 */
const addOrRemoveFavorite = (dataDetail: []) => {
  const isFavorite = store.getters.isItemInFavorites(dataDetail);

  if (isFavorite) {
    store.commit("removeFromFavorites", dataDetail);
  } else {
    store.commit("addToFavorites", dataDetail);
  }
};

// const truncateDescription = (description: string) => {
//   if (description && description.length > 10) {
//     return description.slice(0, 10) + "...";
//   }
//   return description;
// };

/**
 * Belirlenen bir Comics detay sayfasına yönlendirir.
 * @param id - Comics ID'si
 */
const goDetail = (id: string) => {
  router.push(`/comics/${id}`);
};

/**
 * Sayfa yüklendiğinde Comics verilerini alır.
 */
onMounted(() => {
  getComics();
});
</script>

<style scoped>
.movies-items-image {
  transition: transform 450ms;
}

.scale-img {
  max-height: 250px;
}

.scale-img:hover {
  transform: scale(1.09);
}
</style>
