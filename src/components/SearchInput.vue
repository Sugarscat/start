<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {useEngineStore} from "@/stores/engine";
import {useEngineListStore} from "@/stores/engineList";

defineComponent({
  name: "SearchInput",
})

const engineStore = useEngineStore();
const engineListStore = useEngineListStore();
const inputValue = ref('');
const doSearch = () => {
  if (!engineStore.engine)
    engineStore.setEngine(engineListStore.engines[0].url);
  location.href = engineStore.engine + inputValue.value;
};

onMounted(() => {
  if (!engineStore.engine)
    engineStore.setEngine(engineListStore.engines[0].url);
});
</script>

<template>
  <div class="search-input-area">
    <div id="icon"></div>
    <input class="search-input"
           v-model="inputValue"
           placeholder="搜索，或输入网址"
           @keyup.enter="doSearch"
    >
    <button class="search-image"></button>
  </div>
</template>

<style scoped lang="scss">
  .search-input-area {
    height: 2.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.45rem;
    box-shadow: var(--shadow);
    padding: 0 20px;
    background-color: var(--vt-c-white);
    min-width: 560px;

    @media (max-width: 600px) {
      padding: 0 10px;
    }

    #icon {
      background-color: var(--color-realbox-search-icon-background);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 16px;

      -webkit-mask-image: url(/images/icon_search.svg);
      -webkit-mask-size: 25px;
      -webkit-mask-position: center;
      -webkit-mask-repeat: no-repeat;

      height: 24px;
      width: 24px;
    }

    input.search-input {
      border: none;
      padding: 0 .9rem;
      outline: none;

      border-radius: calc(0.5 * var(--cr-realbox-height));;
      color: var(--color-realbox-foreground);
      font-family: inherit;
      font-size: inherit;
      height: 100%;
      outline: 0;
      position: relative;
      width: 100%;
      min-width: 300px;
    }

    button {
      height: 100%;
      width: 24px;
      border: none;
      cursor: pointer;
      background-image: url(/images/lens_icon.svg);
      background-color: transparent;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 21px 21px;
      border-radius: 2px;

      outline: 0;
      padding: 0;
      pointer-events: auto;

    }
  }

  @media (max-width: 600px) {
    .search-input-area {
      min-width: 340px;
      width: 100%;
    }
  }
</style>
