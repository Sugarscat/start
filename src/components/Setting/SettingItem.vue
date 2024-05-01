<script setup lang="ts">

import Tip from "@/components/Tip.vue";
import ReviseIcon from "@/components/icons/ReviseIcon.vue";

const model = defineModel()

const props = defineProps<{
  title: string,
  revise: boolean
}>()
</script>

<template>
  <div class="setting-item">
    <div class="setting-item-title">
      <span>{{ props.title }}</span>
      <div class="setting-item-operation">
        <revise-icon @click="model=!model"
                     title="编辑"
                     class="button"
                     :class="{active: model}"
                     v-if="props.revise"
        />
        <Tip msg="再次点击，关闭编辑" type="warning" v-if="model"/>
      </div>
    </div>
    <div class="setting-item-content">
      <slot name="default"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.setting-item {
  margin-bottom: 10px;

  background-color: var(--color-background);
  padding: 10px;
  border-radius: 10px;

  .setting-item-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;

    span {
      font-size: .9rem;
      font-weight: bold;
    }

    .setting-item-operation {
      display: flex;
      align-items: center;

      gap: 10px;

      svg {
        height: .9rem;
        width: .9rem;

        &.close {
          height: 1.25rem;
          width: 1.25rem;
        }
      }

      .tip {
        font-size: 14px;
      }
    }
  }

  .setting-item-content {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

}
</style>