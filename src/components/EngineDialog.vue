<script setup lang="ts">
import {ref} from "vue";
import {useEngineListStore} from "@/stores/engineList";
import CloseIcon from "@/components/icons/CloseIcon.vue";

const props = defineProps<{
  visible: boolean,
  onClose: () => void,
}>()

const engineListStore = useEngineListStore();
const data = ref({
  name: '',
  icon: '',
  url: '',
  revise: true,
})

const addEngine = () => {
  if (!data.value.name || !data.value.icon || !data.value.url) {
    return;
  }
  engineListStore.addEngines(data.value);
  // 重置表单数据
  data.value = {
    name: '',
    icon: '',
    url: '',
    revise: true,
  }
  props.onClose();
}
</script>

<template>
  <div class="dialog" :class="{close: !props.visible}">
    <div class="dialog-content" :class="{open: props.visible}">
      <div class="title">
        <span>
          添加搜索引擎
        </span>
        <div class="close-operation" @click="props.onClose()">
          <close-icon/>
        </div>
      </div>
      <div class="content">
        <label>
          <span>名称</span>
          <input type="text" placeholder="请输入搜索引擎名称" v-model="data.name"/>
        </label>
        <label>
          <span>图标</span>
          <input type="text" placeholder="请输入搜索引擎图标地址" v-model="data.icon"/>
        </label>
        <label>
          <span>地址</span>
          <input type="text" placeholder="请输入搜索引擎地址" v-model="data.url"/>
        </label>
      </div>
      <div class="operation">
        <button @click="addEngine">添加</button>
      </div>
    </div>
    <div class="dialog-backdrop" @click="props.onClose()"></div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;

  &.close {
    animation: dialog-close 0.3s ease-in-out;
    display: none;

    .dialog-backdrop {
      opacity: 0;
    }
  }

  .dialog-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 15px;
    border-radius: 10px;
    background: var(--color-background);
    box-shadow: var(--shadow);

    z-index: 99;

    animation: dialog-content-close 0.3s ease-in-out;

    &.open {
      animation: dialog-open 0.3s ease-in-out;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 20px;

      .close-operation {
        display: flex;
        align-items: center;
        justify-content: space-between;

        cursor: pointer;

        svg {
          height: 25px;
          width: 25px;
        }
      }

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 15px;

      label {
        display: flex;
        align-items: center;
        gap: 10px;

        span {
          font-size: 14px;
          color: #666;
        }

        input {
          flex: 1;
          height: 45px;
          line-height: 45px;
          padding: 0 10px;
          border: 1px solid #eee;
          border-radius: 4px;
          outline: none;
          font-size: 14px;
          color: #333;
        }
      }
    }

    .operation {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      button {
        height: 40px;
        width: 90px;

        border: 1px solid var(--el-color-primary-light-3);
        background-color: var(--el-color-primary-light-8);
        border-radius: 5px;

        cursor: pointer;

        transition: all 0.1s ease-in-out;

        &:hover {
          background-color: var(--el-color-primary-light-3);
        }
      }
    }
  }

  .dialog-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--el-overlay-color-lighter);

    transition: all 0.25s ease-in-out;

    z-index: 0;
  }
}

@keyframes dialog-open {
  0% {
    transform: translate(-50%, 150%);
  }

  100% {
    transform: translate(-50%, -50%);
  }
}

@keyframes dialog-close {
  0% {
    display: block;
  }

  100% {
    display: none;
  }
}

@keyframes dialog-content-close {
  0% {
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-50%, 150%);
  }
}
</style>
