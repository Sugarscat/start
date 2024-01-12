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

const isValidUrl = (url: string): number => {
  // 使用正则表达式匹配网址的模式
  const noHttpUrlRegex: string = "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      + "[a-z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

  const hasHttpRegex: string = "^((https|http|ftp|rtsp|mms)://)"
      + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      + "[a-z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

  const re1 = new RegExp(noHttpUrlRegex);
  const re2 = new RegExp(hasHttpRegex);
  // 返回正则表达式匹配成功的结果
  if (re1.test(url)) {
    return 1;
  } else if (re2.test(url)) {
    return 2;
  } else {
    return 0;
  }
}

const doSearch = () => {

  if (!engineStore.engine)
    engineStore.setEngine(engineListStore.engines[0].url);

  if (inputValue.value) {
    const re = isValidUrl(inputValue.value)
    console.log(re)
    switch (re) {
      case 1:
        location.href = 'http://' + inputValue.value;
        break;
      case 2:
        location.href =  inputValue.value;
        break;
      default:
        location.href = engineStore.engine + inputValue.value;
    }
  } else {
    location.href = engineStore.engine + inputValue.value;
  }
}

onMounted(() => {
  if (!engineStore.engine)
    engineStore.setEngine(engineListStore.engines[0].url);
})
</script>

<template>
  <div class="search-input-area">
    <div id="icon"></div>
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
      font-size: 16px;

      border-radius: calc(0.5 * var(--cr-realbox-height));;
      color: var(--color-realbox-foreground);

      height: 100%;
      width: 100%;
      min-width: 300px;

      position: relative;

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
