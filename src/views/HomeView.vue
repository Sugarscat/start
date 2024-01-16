<script setup lang="ts">

import {ref} from "vue";
import SearchInput from "@/components/SearchInput.vue";
import Setting from "@/components/Setting.vue";
import Drawer from "@/components/Drawer.vue";
import SettingIcon from "@/components/icons/SettingIcon.vue";
import Background from "@/components/Background.vue";

const visible = ref(false);

</script>

<template>
  <Background/>
  <div @click="visible = true" class="setting-btn">
    <setting-icon/>
  </div>

  <div class="occupancy top"></div>
  <search-input/>
  <div class="occupancy bottom"></div>

  <Drawer v-model="visible">
    <template #title>
      设置
    </template>
    <template #content>
      <Setting/>
    </template>
  </Drawer>
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
