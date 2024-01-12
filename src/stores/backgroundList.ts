import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useBackgroundListStore =
    defineStore('backgroundList', () => {

        const backgrounds = ref<{
            solid: boolean;
            revise: boolean;
            value: string
        }[]>([])

        const addBackground = (item: any) => {
            backgrounds.value.push(item)
        }

        const deleteBackground = (item: number) => {
            backgrounds.value.splice(item, 1)
        }

        const gerBackground = (i: number) => {
            return backgrounds.value[i]
        }

        return {
            backgrounds,
            addBackground,
            deleteBackground,
            gerBackground
        }

    }, {
        persist: true
    })
