import { ref } from 'vue'
import { defineStore } from 'pinia'

interface bg<T> {
    solid: boolean;
    revise: boolean;
    value: string
}

export const useBackgroundStore =
    defineStore('background', () => {
        const background = ref<bg<any>>()

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
