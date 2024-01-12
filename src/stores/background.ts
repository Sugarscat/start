import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBackgroundStore =
    defineStore('background', () => {
        const background = ref<{
            solid: boolean;
            revise: boolean;
            value: string
        }>()

        const setBackground = (item: any) => {
            background.value = item
        }

        return {
            background,
            setBackground,
        }
    }, {
        persist: true
    })
