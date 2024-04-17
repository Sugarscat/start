import {ref} from 'vue'
import { defineStore } from 'pinia'

export type Background = {
  solid: boolean,
  revise: boolean,
  value: string
}

export const backgrounds:Background[] = [
  {
    solid: false,
    revise: false,
    value: ''
  }
]

export const useBackgroundListStore =
    defineStore('backgroundList', () => {

        const backgroundList = ref<Background[]>(backgrounds)

        const addBackground = (item: Background) => {
            backgroundList.value.push(item)
        }

        const deleteBackground = (item: number) => {
            backgroundList.value.splice(item, 1)
        }

        const getBackground = (i: number) => {
            return backgroundList.value[i]
        }

        return {
            backgroundList,
            addBackground,
            deleteBackground,
            getBackground
        }

    }, {
        persist: true
    })
