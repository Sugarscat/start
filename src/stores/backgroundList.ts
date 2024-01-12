import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useBackgroundListStore =
    defineStore('backgroundList', () => {

        const backgrounds = ref(
            [
                {
                    solid: false,
                    revise: true,
                    value: 'https://source.unsplash.com/random/1920x1080'
                }
            ]
        )

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
