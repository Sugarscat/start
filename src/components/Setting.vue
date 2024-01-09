<script setup lang="ts">
import {defineComponent, ref} from 'vue'
import {useEngineStore} from "@/stores/engine";
import {useEngineListStore} from "@/stores/engineList";
import Tip from "@/components/Tip.vue";

defineComponent({
  name: "Setting",
})

const engineStore = useEngineStore();
const engineListStore = useEngineListStore();

</script>

<template>
  <div class="setting-area">
    <div class="setting-title">设置</div>
    <div class="setting-content">
      <div class="setting-item">
        <div class="setting-item-title">搜索引擎</div>
        <div class="setting-item-content">
          <div class="setting-item-content-item"
               v-for="engine in engineListStore.engines"
               :key="engine.name"
               :class="{active: engineStore.engine === engine.url}"
               @click="engineStore.engine = engine.url"
          >
            <div class="setting-item-content-item-icon"
                 :style="{backgroundImage: `url(${engine.icon})`}"></div>
            <div class="setting-item-content-item-name">{{engine.name}}</div>
          </div>
          <div class="setting-item-content-item">
            <div>

            </div>
          </div>
        </div>
        <tip msg="若图标无法正常显示，则表明你所在区域无法使用该搜索引擎！" type="warning"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.setting-area {

  .setting-title {
    font-size: larger;
    font-weight: bold;
  }

  .setting-content {

    .setting-item {

      .setting-item-title {
        font-size: large;
        font-weight: 200;
      }

      .setting-item-content {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        .setting-item-content-item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          border: 2px solid var(--el-color-primary-light-3);
          border-radius: 10px;

          transition: all 0.25s ease-in-out;

          .setting-item-content-item-icon {
            height: 24px;
            width: 24px;
            background-size: 24px;
            background-position: center center;
            background-repeat: no-repeat;
            margin-right: 10px;
          }

          .setting-item-content-item-name {
            font-size: .9rem;
            font-weight: 700;
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
