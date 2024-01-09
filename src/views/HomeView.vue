<script setup lang="ts">

import SearchInput from "@/components/SearchInput.vue";
import Setting from "@/components/Setting.vue";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";

const isOpen = ref(false);

const openDrawer = () => {
  isOpen.value = true;
}

const closeDrawer = () => {
  isOpen.value = false;
}
</script>

<template>
  <button @click="openDrawer" style="cursor: pointer">打开</button>
  <drawer :on-close="closeDrawer" :visible="isOpen">
    <template #content>
      <setting/>
    </template>
  </drawer>
  <search-input/>
</template>
