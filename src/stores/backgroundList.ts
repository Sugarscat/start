import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useBackgroundsListStore =
    defineStore('engineList', () => {

        const backgrounds = ref([])

        const addBackgrounds = (item: never) => {
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
            addBackgrounds,
            deleteBackground,
            gerBackground
        }

    }, {
        persist: true
    })
