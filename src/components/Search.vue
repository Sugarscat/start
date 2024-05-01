<script setup lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue'
import {useConfigStore, useEngineListStore} from "@/stores";
import type { Engine } from '@/stores/engineList';
import Dialog from "@/components/Dialog.vue";
import BtRadio, { BtRadioItem } from "@/components/BluetRadio";

defineComponent({
  name: "Search",
})

const configStore = useConfigStore()
const engineListStore = useEngineListStore();

const inputValue = ref('');
const iconDom = ref()
const engine = ref<Engine>();
const showEngineList = ref(false);

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

const doSearch = () => {

  if (!engine.value) {
    if (!configStore.getEngine())
      configStore.setEngine(engineListStore.getEngine(0));
    engine.value = configStore.getEngine();
  }

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
        location.href = engine.value.url + inputValue.value;
    }
  }
}

onMounted(() => {
  engine.value = configStore.getEngine();
  iconDom.value.style.backgroundImage = `url(${engine.value.icon})`

  watch(() => configStore.getEngine(), () => {
    engine.value = configStore.getEngine()
  })

  watch(() => engine.value, () => {
    iconDom.value.style.backgroundImage = `url(${engine.value?.icon})`
  })
})
</script>

<template>
  <div class="search-input-area">
    <div id="icon" ref="iconDom" @click="showEngineList = true"></div>
    <input class="search-input"
           v-model="inputValue"
           placeholder="回车探索世界，或输入网址"
           @keyup.enter="doSearch"
           type="text"
    >
    <!-- <button class="search-image" title="不支持"></button> -->
  </div>

  <Dialog v-model="showEngineList" title="选择搜索引擎">
    <template #content>
      <div class="search-engine-dialog">
        <bt-radio>
          <bt-radio-item v-for="item in engineListStore.engineList" 
            :active="engine?.url === item.url"
            :key="item.name"
            @click="() => {
              engine = item;
              showEngineList = false;
            }"
          >
            <div class="search-engine-item">
              <img :src="item.icon" alt="">
              <span class="text">{{ item.name }}</span>
            </div>
          </bt-radio-item>
        </bt-radio>
      </div>
    </template>
  </Dialog>
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
    background-size: 100%;
    border-radius: 3px;

    height: 22px;
    width: 22px;
    cursor: pointer;
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

.search-engine-dialog {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;

  .search-engine-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    img {
      width: 20px;
      height: 20px;
      border-radius: 3px;
    }

    .text {
      font-size: .8rem;
      font-weight: bold;
    }
  }
}
</style>
