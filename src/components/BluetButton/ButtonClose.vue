<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
</script>

<template>
  <button class="bluet-btn btn-close">
    <close-icon class="close-icon"/>
  </button>
</template>

<style scoped>
.bluet-btn.btn-close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--el-color-info-light-8);
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

  &:hover {
    .close-icon {
      fill: var(--el-text-color-regular);
    }
  }

  .close-icon {
    width: 15px;
    height: 15px;
  }
}
</style>