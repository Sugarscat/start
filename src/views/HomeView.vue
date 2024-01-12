<script setup lang="ts">

import SearchInput from "@/components/SearchInput.vue";
import Setting from "@/components/Setting.vue";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";
import SettingIcon from "@/components/icons/SettingIcon.vue";
import Background from "@/components/Background.vue";

const isOpen = ref(false);

const openDrawer = () => {
  isOpen.value = true;
}

const closeDrawer = () => {
  isOpen.value = false;
}
</script>

<template>
  <Background/>
  <div @click="openDrawer" class="setting-btn">
    <setting-icon/>
  </div>

  <div class="occupancy top"></div>
  <search-input/>
  <div class="occupancy bottom"></div>

  <drawer :on-close="closeDrawer" :visible="isOpen">
    <template #title>
      设置
    </template>
    <template #content>
      <setting/>
    </template>
  </drawer>
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

.occupancy {
  height: 10vh;

  &.top {
    @media (min-width: 600px) {
      display: none;
    }
    //background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
  }

  &.bottom {
    height: 20vh;
    @media (max-width: 600px) {
      display: none;
    }
    //background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
  }
}
</style>
