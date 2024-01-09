<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  visible: boolean,
  onClose: () => void,
}>()

</script>

<template>
  <div class="drawer" :class="{close: !props.visible}">
    <div class="drawer-content" :class="{open: props.visible}">
      <slot name="content"></slot>
    </div>
    <div class="drawer-backdrop" @click="props.onClose()"></div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &.close {
    animation: drawer-close 0.3s ease-in-out;
    display: none;

    .drawer-backdrop {
      opacity: 0;
    }
  }

  .drawer-content {
    animation: drawer-content-close 0.3s ease-in-out;
  }
}

.drawer-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: var(--el-overlay-color-lighter);

  transition: all 0.25s ease-in-out;
}

.drawer-content {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 10;
  width: 350px;

  background: var(--color-background);
  padding: 15px;
  border-radius: 10px 0 0 10px;
  box-shadow: var(--shadow);

  .setting-title {
    font-size: larger;
    font-weight: bold;
  }

  &.open {
    animation: drawer-open 0.3s ease-in-out;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    border-radius: 0;
  }
}

@keyframes drawer-open {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes drawer-close {
  0% {
    display: block;
  }

  100% {
    display: none;
  }
}

@keyframes drawer-content-close {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
