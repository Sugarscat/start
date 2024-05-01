<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  list: {
    type: [],
    required: true
  },
  active: {
    type: Number,
    required: true
  }
}>();

</script>

<template>
    <div class="bluet-radio">
        <div class="radio-item" 
            v-for="(item, index) in props.list"
            :key="index"
            :class="{ active: props.active+'' === index }"
        >
            
        </div>
    </div>
</template>

<style scoped lang="scss">
.bluet-radio {
    .radio-item {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        border: 2px solid var(--el-color-info-light-7);
        border-radius: 10px;

        transition: all 0.25s ease-in-out;

        .text {
            font-size: .8rem;
            font-weight: bold;

            &.theme {
            padding: 0 10px;
            }
        }

        &.active {
            border-color: var(--el-color-primary-light-3);
            background-color: var(--el-color-primary-light-8);
        }
    }
}
</style>
