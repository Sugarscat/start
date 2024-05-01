<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: '',
        required: false
    }
})
</script>

<template>
    <button class="bluet-button" :class="props.type">
        <slot name="default"></slot>
    </button>
</template>

<style lang="scss" scoped>
.bluet-button {
    width: 80px;
    height: 35px;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;

    transition: all 0.25s ease;

    background-color: var(--el-color-info-light-8);
    color: var(--el-color-info);

    &.primary {
        background-color: var(--el-color-primary);
        color: #fff;
    }

    &.success {
        background-color: var(--el-color-success);
        color: #fff;
    }

    &.danger {
        background-color: var(--el-color-danger);
        color: #fff;
    }

    &.warning {
        background-color: var(--el-color-warning);
        color: #fff;
    }

    &:hover {
        background-color: var(--el-color-primary-light-3);
        color: var(--color-text)
    }
}
</style>