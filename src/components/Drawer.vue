<script setup lang="ts">

import CloseIcon from "@/components/icons/CloseIcon.vue";
import {onMounted, ref, watch} from "vue";
import anime from "animejs";


const model = defineModel()

watch(() => model.value, (value) => {
  if (value) {
    openAnimation()
  } else {
    closeAnimation()
  }
})

const drawer = ref()
const body = ref()
const backdrop = ref()
const duration = 300

const close = () => {
  model.value = false
}

const openAnimation = () => {
  drawer.value.style.display = "flex"
  anime({
    targets: body.value,
    right: ["-400px", 0],
    duration: duration,
    easing: "easeInOutQuad",
  })
}

const closeAnimation = () => {
  anime({
    targets: body.value,
    right: [0, "-400px"],
    duration: duration,
    easing: "easeInOutQuad",
    complete: () => {
      drawer.value.style.display = "none"
    }
  })
}

onMounted(()=>{
  if (model.value) {
    drawer.value.style.display = "flex"
  } else {
    drawer.value.style.display = "none"
  }
})

</script>

<template>
  <div class="drawer" ref="drawer" :class="{close:!model}">
    <div class="drawer-body" ref="body">
      <div class="title">
      <span>
        <slot name="title"></slot>
      </span>
        <div class="close-operation" @click="close()">
          <close-icon/>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="drawer-backdrop" @click="close()" ref="backdrop"></div>
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

  display: flex;
  justify-content: flex-end;

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
    .drawer-backdrop {
      opacity: 0;
    }
  }

  .drawer-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--el-overlay-color-lighter);

    transition: opacity 0.3s ease-in-out;
  }

  .drawer-body {
    height: 100%;
    z-index: 10;
    width: 400px;
    padding: 15px;
    border-radius: 15px 0 0 15px;
    background: var(--color-background);
    box-shadow: var(--shadow);

    position: absolute;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 500px) {
      width: 100%;
      border-radius: 0;
    }

    .content {
      height: 100%;
      background-color: var(--el-color-info-light-8);
      padding: 10px;
      border-radius: 20px;

      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
