<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps(
  {
    msg: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    }
  }
)

const className = ref('')
onMounted(() => {
  className.value = `tip ${props.type}`
})
</script>

<template>
  <div :class="className">
    Tip: {{props.msg}}
  </div>
</template>

<style scoped lang="scss">
.tip {

  color: var(--el-color-info);

  &.warning {
    color: var(--el-color-warning);
  }

  &.info {
    color: var(--el-color-primary);
  }

  &.success {
    color: var(--el-color-success);
  }

  &.error {
    color: var(--el-color-error);
  }
}
</style>
