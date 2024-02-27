import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useEngineStore =
    defineStore('engine', () => {
        const engine = ref({})

        const setEngine = (item: string, icon: string) => {
            engine.value = {
                icon: icon,
                url: item
            }
        }

        const getEngine = () => {
            return engine.value
        }

        return { engine, setEngine, getEngine }
    }, {
        persist: true
    })
