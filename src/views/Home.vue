<template>
  <v-container>
    <v-row>
      <v-col>
        <MarvelComics />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// import HelloWorld from '@/components/HelloWorld.vue'
import MarvelComics from "./apps/marvel-comics/ComicsComponent.vue";
import MainComponent from "./apps/main-page/MainComponent.vue";

const ComicsComponent = {
  // Bileşen seçenekleri
  // ...
};
</script>
