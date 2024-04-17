<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {useConfigStore} from "@/stores";

const configStore = useConfigStore()

const backgroundHtml = ref();
const hasBg = ref(false);

const update = () => {
  if (configStore.getBackground()) {
    if (!configStore.getBackground().solid) {
      backgroundHtml.value.style.backgroundImage = `url('${configStore.getBackground().value}')`;
    } else {
      backgroundHtml.value.style.backgroundColor = configStore.getBackground().value
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
  watch(configStore, ()=>{
    update()
  })
})
</script>

<template>
  <div class="main-bg">
    <div class="mask-layer" v-if="hasBg"></div>
    <div class="background" ref="backgroundHtml"></div>
  </div>
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
