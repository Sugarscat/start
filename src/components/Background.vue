<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useBackgroundStore} from "@/stores/background";

const backgroundHtml = ref();
const backgroundStore = useBackgroundStore();
const hasBg = ref(false);

const update = () => {
  if (backgroundStore.background) {
    if (!backgroundStore.background.solid) {
      backgroundHtml.value.style.backgroundImage = `url('${backgroundStore.background.value}')`;
    } else {
      backgroundHtml.value.style.backgroundColor = backgroundStore.background.value
    }
    hasBg.value = true;
  } else {
    backgroundHtml.value.style.backgroundImage = '';
    backgroundHtml.value.style.backgroundColor = '';
    hasBg.value = false;
  }
}

onMounted(() => {
  update()
  watch(backgroundStore, ()=>{
    update()
  })
})
</script>

<template>
  <div class="mask-layer" v-if="hasBg"></div>
  <div class="background" ref="backgroundHtml"></div>
</template>

<style scoped lang="scss">
.mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100%;
  height: 100%;

  transition: background-color 0.3s ease-in-out;
}

.dark .mask-layer {
  background-color: var(--el-overlay-color-lighter);
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;

  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center;
}
</style>
