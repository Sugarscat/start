<script setup lang="ts">
import CloseIcon from "@/components/icons/CloseIcon.vue";
import {onMounted, ref, watch} from "vue";
import gsap from "gsap";

const props = defineProps<{
  onSure: () => void,
}>()

const model = defineModel()

watch(() => model.value, (value) => {
  if (value) {
    openAnimation()
  } else {
    closeAnimation()
  }
})

const dialog = ref()
const body = ref()
const backdrop = ref()

const timeline = gsap.timeline()

const close = () => {
  model.value = false
}

const openAnimation = () => {
  timeline.set(dialog.value, {
    display: "flex",
  })

  timeline.fromTo(body.value, {
    y: "80vh",
  }, {
    y: 0,
    duration: 0.3,
    ease: "power1.out",
  })

  timeline.set(backdrop.value, {
    opacity: 1,
    duration: 0.3,
    ease: "power1.out",
  }, "<")
}

const closeAnimation = () => {
  timeline.fromTo(body.value, {
    y: 0,
  }, {
    y: "80vh",
    duration: 0.3,
    ease: "power1.out"
  })

  timeline.set(backdrop.value, {
    opacity: 0,
    duration: 0.3,
    ease: "power1.out",
  }, "<")

  timeline.set(dialog.value, {
    display: "none",
  })
}

onMounted(() => {
  if (model.value)
    dialog.value.style.display = "flex"
  else
    dialog.value.style.display = "none"
})
</script>

<template>
  <div class="dialog" ref="dialog">
    <div class="dialog-body" ref="body">
      <div class="title">
        <span>
          <slot name="title"></slot>
        </span>
        <div class="close-operation" @click="close">
          <close-icon/>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="dialog-operation">
        <button @click="props.onSure()">确认</button>
      </div>
    </div>
    <div class="dialog-backdrop" @click="close" ref="backdrop"></div>
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

  z-index: 1;

  .dialog-body {
    position: absolute;
    width: 400px;
    padding: 15px;
    border-radius: 10px;
    background: var(--color-background);
    box-shadow: var(--shadow);

    z-index: 99;

    @media (max-width: 410px) {
      width: 360px;
    }

    @media (max-width: 360px) {
      width: 340px;
    }

    .title {
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

    .dialog-operation {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      button {
        height: 35px;
        width: 90px;

        border: 2px solid var(--el-color-primary-light-3);
        background-color: var(--el-color-primary-light-8);
        border-radius: 5px;

        cursor: pointer;

        transition: all 0.1s ease-in-out;

        font-size: .8rem;
        font-weight: bold;
        color: var(--color-text);

        &:hover {
          background-color: var(--el-color-primary-light-3);
          color: var(--color-background);
        }
      }
    }
  }

  .dialog-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--el-overlay-color-lighter);

    transition: all 0.25s ease-in-out;

    z-index: 0;
  }
}
</style>
