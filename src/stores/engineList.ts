import {ref} from 'vue'
import { defineStore } from 'pinia'

export type Engine =  {
  icon: string,
  name: string,
  url: string,
  revise: boolean
}

export const engines: Engine[] = [
  {
    name: 'Bing',
    icon: 'https://www.bing.com/favicon.ico',
    url: 'https://www.bing.com/search?q=',
    revise: false
  },
  {
    name: 'Google',
    icon: 'https://www.google.com/favicon.ico',
    url: 'https://www.google.com/search?q=',
    revise: true
  },
  {
    name: '百度',
    icon: 'https://www.baidu.com/favicon.ico',
    url: 'https://www.baidu.com/s?wd=',
    revise: true
  },
  {
    name: 'DuckDuckGo',
    icon: 'https://duckduckgo.com/favicon.ico',
    url: 'https://duckduckgo.com/?q=',
    revise: true
  },
  {
    name: 'Yandex',
    icon: 'https://yandex.com/favicon.ico',
    url: 'https://yandex.com/search/?text=',
    revise: true
  },
  {
    name: '搜狗',
    icon: 'https://www.sogou.com/favicon.ico',
    url: 'https://www.sogou.com/web?query=',
    revise: true
  }
]

export const useEngineListStore = defineStore('engineList', () => {
  const engineList = ref<Engine[]>(engines)

  const addEngine = (item: Engine) => {
    engineList.value.push(item)
  }

  const deleteEngine = (item: number) => {
    engineList.value.splice(item, 1)
  }

  const getEngine = (item: number) => {
    return engineList.value[item]
  }

  return {
    engineList,
    addEngine,
    deleteEngine,
    getEngine
  }

}, {
  persist: true
})
