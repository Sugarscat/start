<script setup lang="ts">
import {defineComponent, ref} from 'vue'
import {useEngineStore} from "@/stores/engine";
import {useEngineListStore} from "@/stores/engineList";
import Tip from "@/components/Tip.vue";
import EngineDialog from "@/components/EngineDialog.vue";
import ReviseIcon from "@/components/icons/ReviseIcon.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import {useDark, useToggle} from "@vueuse/core";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

defineComponent({
  name: "Setting",
})

const engineStore = useEngineStore();
const engineListStore = useEngineListStore();
const engineDialogVisible = ref(false);
const isOperation = ref(false);
const isDark = useDark()

const deleteEngines = (number: number) => {
  if (engineStore.engine === engineListStore.engines[number].url) {
    engineStore.setEngine(engineListStore.engines[0].url)
  }
  engineListStore.deleteEngines(number)
}

const addEngine = () => {
  engineDialogVisible.value = true;
}

const closeAddEngineDialog = () => {
  engineDialogVisible.value = false;
}
</script>

<template>
  <div class="setting-area">
    <div class="setting-content">
      <div class="setting-item">
        <div class="setting-item-title">
          <span>搜索引擎</span>
          <div class="revise-operation operation">
            <revise-icon @click="isOperation=true" title="编辑"/>
            <close-icon @click="isOperation=false" v-show="isOperation" title="关闭编辑"/>
          </div>
        </div>
        <div class="setting-item-content">
          <div class="content-item"
               v-for="(engine, number) in engineListStore.engines"
               :key="engine.name"
               :class="{active: engineStore.engine === engine.url}"
               @click="engineStore.engine = engine.url"
          >
            <div class="engine-icon"
                 :style="{backgroundImage: `url(${engine.icon})`}"></div>
            <div class="text">{{engine.name}}</div>
            <div class="operation" v-show="isOperation&&engine.revise" @click.stop>
              <revise-icon/>
              <delete-icon @click="deleteEngines(number)"/>
            </div>
          </div>
          <div class="content-item" title="添加" @click="addEngine">
            <add-icon/>
          </div>
        </div>
        <div style="height: 10px"/>
        <tip msg="若图标无法正常显示，则表明你所在区域无法使用该搜索引擎！" type="warning"/>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">
          <span>主题</span>
        </div>
        <div class="setting-item-content">
          <div class="content-item"
                :class="{active: !isDark}"
                @click="isDark = false"
          >
            <div class="text theme">
              浅色
            </div>
          </div>
          <div class="content-item"
               :class="{active: isDark}"
               @click="isDark = true"
          >
            <div class="text theme">
              深色
            </div>
          </div>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-title">
          <span>背景</span>
        </div>
        <div class="setting-item-content">

        </div>
      </div>
    </div>
  </div>

  <EngineDialog :on-close="closeAddEngineDialog" :visible="engineDialogVisible"/>
</template>

<style scoped lang="scss">
.setting-area {

  .setting-content {

    .setting-item {
      margin-bottom: 10px;

      .setting-item-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        gap: 10px;

        span {
          font-size: .9rem;
          font-weight: bold;
        }

        .operation {
          display: flex;
          align-items: center;
          cursor: pointer;

          gap: 10px;

          svg {
            height: .9rem;
            width: .9rem;

            &.close {
              height: 1.25rem;
              width: 1.25rem;
            }
          }
        }
      }

      .setting-item-content {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        .content-item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          border: 2px solid var(--el-color-primary-light-3);
          border-radius: 10px;

          transition: all 0.25s ease-in-out;

          .operation {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 10px;
            flex-direction: row;

            padding: 2px 8px;
            border-radius: 12px;

            //background-color: var(--el-color-primary-light-7);

            svg {
              height: 15px;
              width: 15px;

              &.revise {
                fill: var(--el-color-primary-light-3);
              }

              &.delete {
                width: 20px;
                height: 20px;
              }
            }
          }

          .engine-icon {
            height: 24px;
            width: 24px;
            background-size: 24px;
            background-position: center center;
            background-repeat: no-repeat;
            margin-right: 10px;
          }

          .text {
            font-size: .8rem;
            font-weight: bold;

            &.theme {
              padding: 0 10px;
            }
          }

          &.active {
            background-color: var(--el-color-primary-light-8);
          }
        }
      }
    }
  }
}
</style>
