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
                name: '百度',
                icon: 'https://www.baidu.com/favicon.ico',
                url: 'https://www.baidu.com/s?wd=',
                revise: true
            },
            {
                name: 'Bing',
                icon: 'https://www.bing.com/favicon.ico',
                url: 'https://www.bing.com/search?q=',
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
