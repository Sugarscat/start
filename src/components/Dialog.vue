<script setup lang="ts">
import {BtButtonClose} from "@/components/BluetButton";
import {onMounted, ref, watch} from "vue";
import anime from "animejs";

const model = defineModel()
const props = defineProps(
  {
    title: {
      type: String,
      required: true
    }
  }
)

const dialog = ref()
const body = ref()
const duration = 200
const visible = ref()

const close = () => {
  model.value = false
}

const openAnimation = () => {
  visible.value = true
  anime({
    targets: body.value,
    opacity: [0, 1],
    duration: duration,
    easing: "easeInOutQuad",
  })
}

const closeAnimation = () => {
  anime({
    targets: body.value,
    opacity: [1, 0],
    duration: duration,
    easing: "easeInOutQuad",
    complete: () => {
      visible.value = false
    }
  })
}

onMounted(() => {
  visible.value = model.value
})

watch(() => model.value, (value) => {
  if (value) {
    openAnimation()
  } else {
    closeAnimation()
  }
})
</script>

<template>
  <div class="dialog" ref="dialog" :class="{close:!model}" v-show="visible">
    <div class="dialog-body" ref="body">
      <div class="head">
        <span>
          {{ props.title }}
        </span>
        <bt-button-close @click="close"></bt-button-close>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="dialog-backdrop" @click="close"></div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;

  .dialog-body {
    position: absolute;
    width: 400px;
    padding: 15px;
    border-radius: 20px;
    background: var(--color-background);
    box-shadow: var(--shadow);
    opacity: 0;

    z-index: 99;

    @media (max-width: 410px) {
      width: 360px;
    }

    @media (max-width: 360px) {
      width: 340px;
    }

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

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

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  &.close {
    .dialog-backdrop {
      opacity: 0;
    }
  }

  .dialog-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--el-overlay-color-lighter);
    transition: opacity 0.25s ease-in-out;
    z-index: 0;
  }
}
</style>
