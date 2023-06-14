<template>
  <v-card class="mx-auto" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1"></div>
      </div>
      <v-container>
        <v-row>
          <v-col cols="auto">
            <h1>
              <span color="red">MARVEL</span>
              <span class="ml-3" style="color: red">COMICS</span>
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-card-item>
    <v-card-actions>
      <v-progress-linear
        v-if="loading"
        color="primary"
        indeterminate
      ></v-progress-linear>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const loading = ref(true);

// Simüle edilen bir asenkron işlem
setTimeout(() => {
  loading.value = false;
}, 3000);
</script>
