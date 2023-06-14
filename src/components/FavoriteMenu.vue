<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="text-none" stacked>
        <v-badge :content="favoriteItemCount" color="error">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list v-for="(item, index) in favoriteItems" :key="index" :value="index">
      <v-list-item @click="getFavoriteComic(item.id)">
        <v-row>
          <v-col cols="2">
            <v-avatar
              :image="item.thumbnail.path + '.' + item.thumbnail.extension"
              rounded="0"
            ></v-avatar>
          </v-col>
          <v-col cols="10">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();

const store = useStore();
const favoriteItemCount = computed(() => store.getters["favoriteItemCount"]);

const getFavoriteComic = (id: number) => {
  router.push({ name: "ComicsDetail", params: { id: String(id) } });
};

const favoriteItems = computed(() => store.getters["favoriteItemData"]);

// watch(
//   () => store.state.favoriteItems,
//   (newFavoriteItems) => {
//     favoriteComics.value = newFavoriteItems;
//     console.log("favoriteItems değişti:", newFavoriteItems);
//   }
// );
</script>
