<script setup lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue'
import {useEngineStore} from "@/stores/engine";
import {useEngineListStore} from "@/stores/engineList";

defineComponent({
  name: "SearchInput",
})

const engineStore = useEngineStore();
const engineListStore = useEngineListStore();
const inputValue = ref('');
const iconDom = ref()

const isValidUrl = (url: string): number => {
  // 使用正则表达式匹配网址的模式
  const noHttpUrlRegex: string = "^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}$";

  const hasHttpRegex: string = "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]";

  const re1 = new RegExp(noHttpUrlRegex);
  const re2 = new RegExp(hasHttpRegex);

  // 返回正则表达式匹配成功的结果
  if (re1.test(url))
    return 1;
  else if (re2.test(url))
    return 2;
  else
    return 0;
}

watch(engineStore, ()=>{
  if (iconDom)
    iconDom.value.style.backgroundImage = `url(${engineStore.engine.icon})`
})

const doSearch = () => {

  if (!engineStore.engine)
    engineStore.setEngine(engineListStore.engines[0].url, engineListStore.engines[0].icon);

  if (inputValue.value.length) {
    const re = isValidUrl(inputValue.value)
    console.log(re)
    switch (re) {
      case 1:
        location.href = 'https://' + inputValue.value;
        break;
      case 2:
        location.href =  inputValue.value;
        break;
      default:
        location.href = engineStore.engine + inputValue.value;
    }
  }
}

onMounted(() => {
  if (!engineStore.engine)
    engineStore.setEngine(engineListStore.engines[0].url, engineListStore.engines[0].icon);
  iconDom.value.style.backgroundImage = `url(${engineStore.engine.icon})`
})
</script>

<template>
  <div class="search-input-area">
    <div id="icon" ref="iconDom"></div>
    <input class="search-input"
           v-model="inputValue"
           placeholder="回车探索世界，或输入网址"
           @keyup.enter="doSearch"
           type="text"
    >
    <button class="search-image" title="不支持"></button>
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
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 20px;

      height: 24px;
      width: 24px;
    }

    input.search-input {
      flex: 1;
      border: none;
      padding: 0 .9rem;
      outline: none;

      line-height: 60px;
      text-overflow: ellipsis;

      border-radius: calc(0.5 * var(--cr-realbox-height));;
      color: var(--color-realbox-foreground);

      height: 100%;
      width: 100%;
      min-width: 200px;

      position: relative;

      font-family: inherit;
      font-size: inherit;

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
      min-width: 200px;
      width: 100%;
    }
  }
</style>
