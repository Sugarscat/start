import {ref} from 'vue'
import { defineStore } from 'pinia'
import {type Engine, engines} from "@/stores/engineList";
import type {Background} from "@/stores/backgroundList";

export type Config =  {
  background: Background,
  engine: Engine,
  history: boolean,
}

const defaultEngine = engines[0]

export const useConfigStore = defineStore('config', () => {

    const config = ref<Config>({
      background: {
        solid: false,
        revise: false,
        value: ''
      },
      engine: {
        name: defaultEngine.name,
        url: defaultEngine.url,
        icon: defaultEngine.icon,
        revise: defaultEngine.revise,
      },
      history: true,
    })

    const setEngine = (engine: Engine) => {
      config.value.engine = engine
    }

    const getEngine = () => {
      return config.value.engine
    }

    const setBackground = (background: Background) => {
      config.value.background = background
    }

    const getBackground = () => {
      return config.value.background
    }

    const recordHistory = (on: boolean)=>{
      config.value.history = on
    }

    return {
      config,
      setEngine,
      getEngine,
      setBackground,
      getBackground,
      recordHistory
    }

  }, {
    persist: true
  })
