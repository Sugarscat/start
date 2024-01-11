<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useBackgroundStore} from "@/stores/background";
import {useBackgroundsListStore} from "@/stores/backgroundList";

const backgroundHtml = ref<HTMLElement | null>(null);
const backgroundStore = useBackgroundStore();
const backgroundsListStore = useBackgroundsListStore();

onMounted(() => {

})
</script>

<template>
  <div class="background" ref="backgroundHtml"></div>
</template>

<style scoped lang="scss">
.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center;
}
</style>
