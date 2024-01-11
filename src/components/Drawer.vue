<script setup lang="ts">

import CloseIcon from "@/components/icons/CloseIcon.vue";

const props = defineProps<{
  visible: boolean,
  onClose: () => void,
}>()

</script>

<template>
  <div class="drawer" :class="{close: !props.visible}">
    <div class="drawer-body" :class="{open: props.visible}">
      <div class="title">
      <span>
        <slot name="title"></slot>
      </span>
        <div class="close-operation" @click="props.onClose()">
          <close-icon/>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
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

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 15px;

    span {
      font-size: larger;
      font-weight: bold;
    }

    .close-operation {
      display: flex;
      align-items: center;
      justify-content: space-between;

      cursor: pointer;

      svg {
        height: 25px;
        width: 25px;
      }
    }
  }

  &.close {
    animation: drawer-close 0.3s ease-in-out;
    display: none;

    .drawer-backdrop {
      opacity: 0;
    }
  }

  .drawer-body {
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

.drawer-body {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 10;
  width: 400px;
  padding: 15px;
  border-radius: 15px 0 0 15px;
  background: var(--color-background);
  box-shadow: var(--shadow);

  display: flex;
  flex-direction: column;

  &.open {
    animation: drawer-open 0.3s ease-in-out;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    border-radius: 0;
  }

  .content {
    height: 100%;
    background-color: var(--el-color-info-light-8);
    padding: 10px;
    border-radius: 20px;
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
