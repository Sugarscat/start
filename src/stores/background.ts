import { ref } from 'vue'
import { defineStore } from 'pinia'

interface UnwrapRefSimple<T> {
    solid: boolean;
    revise: boolean;
    value: string
}

export const useBackgroundStore =
    defineStore('background', () => {
        const background = ref({
            value: '',
            solid: true, // 是否为纯色
            revise: false // 是否可修改
        })

        const setBackground = (item: UnwrapRefSimple<UnwrapRefSimple<{
            solid: boolean;
            revise: boolean;
            value: string
        }>>) => {
            background.value = item
        }

        return {
            background,
            setBackground,
        }
    }, {
        persist: true
    })
