<script setup lang="ts">
const model = defineModel()

</script>

<template>
    <input type="text" v-model="model" />
</template>

<style scoped>
input {
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
</style>