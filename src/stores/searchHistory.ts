import {ref} from 'vue'
import { defineStore } from 'pinia'

type History =  {
  label: string,
  time: string,
}

export const useSearchHistoryStore =
  defineStore('searchHistory', () => {

    const searchHistory = ref<History[]>([])

    return {
      searchHistory,
    }

  }, {
    persist: true
  })
