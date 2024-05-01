<script setup lang="ts">
const props = defineProps<{
  active: Boolean
}>();
</script>

<template>
    <div class="radio-item" :class="{ active: props.active }">
        <slot name="default"></slot>
    </div>
</template>

<style>
.radio-item {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border: 2px solid var(--el-color-info-light-7);
    border-radius: 10px;

    transition: all 0.25s ease-in-out;

    &:hover {
        border-color: var(--el-color-primary-light-3);
        background-color: var(--el-color-primary-light-8);
    }

    &.active {
        border-color: var(--el-color-primary-light-3);
        background-color: var(--el-color-primary-light-8);
    }
}
</style>