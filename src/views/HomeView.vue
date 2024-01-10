<script setup lang="ts">

import SearchInput from "@/components/SearchInput.vue";
import Setting from "@/components/Setting.vue";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";
import SettingIcon from "@/components/icons/SettingIcon.vue";

const isOpen = ref(false);

const openDrawer = () => {
  isOpen.value = true;
}

const closeDrawer = () => {
  isOpen.value = false;
}
</script>

<template>
  <div @click="openDrawer" class="setting-btn">
    <setting-icon/>
  </div>
  <drawer :on-close="closeDrawer" :visible="isOpen">
    <template #title>
      设置
    </template>
    <template #content>
      <setting/>
    </template>
  </drawer>
  <search-input/>
</template>

<style scoped lang="scss">
.setting-btn {
  cursor: pointer;

  position: absolute;
  top: 10px;
  right: 10px;

  svg {
    width: 28px;
    height: 28px;
  }
}
</style>
