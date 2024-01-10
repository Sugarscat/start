import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useEngineListStore =
    defineStore('engineList', () => {

        const engines = ref([
            {
                name: 'Google',
                icon: 'https://www.google.com/favicon.ico',
                url: 'https://www.google.com/search?q=',
                revise: false
            },
            {
                name: 'Bing',
                icon: 'https://www.bing.com/favicon.ico',
                url: 'https://www.bing.com/search?q=',
                revise: false
            },
            {
                name: 'DuckDuckGo',
                icon: 'https://duckduckgo.com/favicon.ico',
                url: 'https://duckduckgo.com/?q=',
                revise: false
            },
            {
                name: 'Yahoo',
                icon: 'https://search.yahoo.com/favicon.ico',
                url: 'https://search.yahoo.com/search?p=',
                revise: false
            },
            {
                name: 'Yandex',
                icon: 'https://yandex.com/favicon.ico',
                url: 'https://yandex.com/search/?text=',
                revise: false
            },
            {
                name: '百度',
                icon: 'https://www.baidu.com/favicon.ico',
                url: 'https://www.baidu.com/s?wd=',
                revise: false
            },
            {
                name: '搜狗',
                icon: 'https://www.sogou.com/favicon.ico',
                url: 'https://www.sogou.com/web?query=',
                revise: false
            }
        ])

        const addEngines = (item: any) => {
            engines.value.push(item)
        }

        const deleteEngines = (item: number) => {
            engines.value.splice(item, 1)
        }

        return { engines, addEngines, deleteEngines }

    }, {
        persist: true
    })
