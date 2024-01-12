<script setup lang="ts">
import CloseIcon from "@/components/icons/CloseIcon.vue";

const props = defineProps<{
  visible: boolean,
  onClose: () => void,
  onSure: () => void,
}>()
</script>

<template>
  <div class="dialog" :class="{close: !props.visible}">
    <div class="dialog-body" :class="{open: props.visible}">
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
      <div class="dialog-operation">
        <button @click="props.onSure()">确认</button>
      </div>
    </div>
    <div class="dialog-backdrop" @click="props.onClose()"></div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;

  &.close {
    animation: dialog-close 0.3s ease-in-out;
    display: none;

    .dialog-backdrop {
      opacity: 0;
    }
  }

  .dialog-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 15px;
    border-radius: 10px;
    background: var(--color-background);
    box-shadow: var(--shadow);

    z-index: 99;

    animation: dialog-content-close 0.3s ease-in-out;

    @media (max-width: 410px) {
      width: 360px;
    }

    &.open {
      animation: dialog-open 0.3s ease-in-out;
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

    .content {

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

@keyframes dialog-open {
  0% {
    transform: translate(-50%, 200%);
  }

  100% {
    transform: translate(-50%, -50%);
  }
}

@keyframes dialog-close {
  0% {
    display: block;
  }

  100% {
    display: none;
  }
}

@keyframes dialog-content-close {
  0% {
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-50%, 200%);
  }
}
</style>
