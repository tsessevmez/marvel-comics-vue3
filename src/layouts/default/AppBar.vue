<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-btn>
        <v-avatar
          @click="goHome()"
          image="../../assets/deadpool.png"
        ></v-avatar>
      </v-btn>
      <!-- Marvel -->
      <v-btn @click="goHome()">Comics</v-btn>
    </v-app-bar-title>

    <template v-slot:append>
      <FavoriteMenu />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
// import { useStore } from "vuex";
// import { computed, ref, watch } from "vue";
import FavoriteMenu from "../../components/FavoriteMenu.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>
