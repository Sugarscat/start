<script setup lang="ts">

import HomeView from "@/views/HomeView.vue";

const isChina = location.hostname === 'search.sugarscat.cn'
    || location.hostname === 'localhost';
</script>

<template>
  <main>
    <HomeView/>
  </main>
<!--  <footer>-->
<!--    <p>-->
<!--      ©  2024-2099 Sugarscat-->
<!--      <span v-if="isChina">-->
<!--        &nbsp|-->
<!--        <a target="_blank"-->
<!--           href="https://beian.miit.gov.cn/"-->
<!--           title="本网站(.cn)已备案，皖ICP备2023005836号-1">-->
<!--          &nbsp皖ICP备2023005836号-1-->
<!--        </a>-->
<!--      </span>-->
<!--    </p>-->
<!--  </footer>-->
</template>

<style scoped lang="scss">
footer
{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p,a,span
  {
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--color-text);

    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
  }
}
</style>
