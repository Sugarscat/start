<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SearchInput"
})


</script>

<template>
  <div class="search-input-area">
    <div id="icon"></div>
    <input class="search-input">
    <button></button>
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
</style>
