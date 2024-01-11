<script setup lang="ts">
import {defineComponent, ref} from 'vue'
import {useEngineStore} from "@/stores/engine";
import {useEngineListStore} from "@/stores/engineList";
import Tip from "@/components/Tip.vue";
import Dialog from "@/components/Dialog.vue";
import ReviseIcon from "@/components/icons/ReviseIcon.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import {useDark} from "@vueuse/core";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";

defineComponent({
  name: "Setting",
})

const engineStore = useEngineStore();
const engineListStore = useEngineListStore();
const dialogVisible = ref(false);
const isOperation = ref(false);
const isDark = useDark()
const engine = ref({
  name: '',
  url: '',
  icon: '',
  revise: true,
})
const index = ref(0)
const title = ref('')
const nameInput = ref()
const iconInput = ref()
const urlInput = ref()

const deleteEngine = (number: number) => {
  if (engineStore.engine === engineListStore.engines[number].url) {
    engineStore.setEngine(engineListStore.engines[0].url)
  }
  engineListStore.deleteEngine(number)
}

const openDialog = () => {
  dialogVisible.value = true;
}

const closeDialog = () => {
  dialogVisible.value = false;
  reset()
}

const reset = () => {
  index.value = 0
  engine.value = {
    name: '',
    url: '',
    icon: '',
    revise: true,
  }
  nameInput.value.classList.remove('error')
  iconInput.value.classList.remove('error')
  urlInput.value.classList.remove('error')
}

const add = () => {
  title.value = '添加搜索引擎'
  openDialog()
}

const addEngine = () => {
  engineListStore.addEngine(engine.value)
  closeDialog()
}

const update = (i: number, value: any) => {
  value = {
    name: value.name,
    url: value.url,
    icon: value.icon,
    revise: value.revise,
  } // 解绑 ref
  title.value = '修改搜索引擎'
  index.value = i
  engine.value = value
  openDialog()
}

const updateEngine = () => {
  engineListStore.engines[index.value] = engine.value
  closeDialog()
}

const onSure = () => {

  if (!verify()) return

  if (index.value === 0) {
    addEngine()
  } else {
    updateEngine()
  }
}

// 验证
const verify = () => {
  let pass = true
  if (!engine.value.name) {
    nameInput.value.classList.add('error')
    pass = false
  } else {
    nameInput.value.classList.remove('error')
  }
  if (!engine.value.icon) {
    iconInput.value.classList.add('error')
    pass = false
  } else {
    iconInput.value.classList.remove('error')
  }
  if (!engine.value.url) {
    urlInput.value.classList.add('error')
    pass = false
  }  else {
    urlInput.value.classList.remove('error')
  }
  return pass
}
</script>

<template>
  <div class="setting-area">
    <div class="setting-body">
      <div class="setting-item">
        <div class="setting-item-title">
          <span>搜索引擎</span>
          <div class="revise-operation operation">
            <revise-icon @click="isOperation=!isOperation"
                         title="编辑"
                         class="button"
                         :class="{active: isOperation}"
            />
            <tip msg="再次点击，关闭编辑" type="warning" v-if="isOperation"/>
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
            <div class="operation" v-if="isOperation&&engine.revise" @click.stop>
              <edit-icon @click="update(number, engine)"/>
              <delete-icon @click="deleteEngine(number)"/>
            </div>
          </div>
          <div class="content-item" title="添加" @click="add()">
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

  <Dialog :on-close="closeDialog"
          :visible="dialogVisible"
          :on-sure="onSure">
    <template #title>
      {{title}}
    </template>
    <template #content>
      <div class="engine-form">
        <div class="form-item">
          <label for="name">名称:</label>
          <div>
            <input type="text"
                   id="name"
                   v-model="engine.name"
                   ref="nameInput"
                   @change="verify"
                   placeholder="请输入搜索引擎名称"
            >
            <p>名称不能为空</p>
          </div>
        </div>
        <div class="form-item">
          <label for="icon">图标:</label>
          <div>
            <input type="text"
                   id="icon"
                   v-model="engine.icon"
                   ref="iconInput"
                   @change="verify"
                   placeholder="请输入搜索引擎图标地址"
            >
            <p>图标不能为空</p>
          </div>
        </div>
        <div class="form-item">
          <label for="url">网址:</label>
          <div>
            <input type="text"
                   id="url"
                   v-model="engine.url"
                   ref="urlInput"
                   @change="verify"
                   placeholder="请输入搜索引擎网址"
            >
            <p>网址不能为空</p>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.setting-area {

  .setting-body {

    .setting-item {
      margin-bottom: 10px;

      background-color: var(--color-background);
      padding: 10px;
      border-radius: 10px;

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

          gap: 10px;

          svg {
            height: .9rem;
            width: .9rem;

            &.close {
              height: 1.25rem;
              width: 1.25rem;
            }
          }

          .tip {
            font-size: 14px;
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
            gap: 5px;
            margin-left: 10px;
            flex-direction: row;

            border-radius: 12px;

            position: relative;
            right: -5px;

            //background-color: var(--el-color-primary-light-7);

            svg {
              width: 18px;
              height: 18px;

              &.edit {
                fill: var(--el-color-primary-light-3);

                &:hover {
                  fill: var(--el-color-primary-light-5);
                }
              }

              &.delete {
                width: 20px;
                height: 20px;

                &:hover {
                  fill: var(--el-color-danger-light-3);
                }
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

.engine-form {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .form-item {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      text-align: right;
    }

    input {
      flex: 1;
      height: 45px;
      width: 325px;
      line-height: 45px;
      padding: 0 10px;
      border: 1.5px solid var(--el-color-info-light-3);
      border-radius: 4px;
      outline: none;

      @media (max-width: 410px) {
        width: 285px;
      }

      &.error {
        border-color: var(--el-color-danger-light-3);
        color: var(--el-color-danger-light-3);
      }

      &:focus {
        border-color: var(--el-color-primary-light-3);
        color: var(--color-text);
      }
    }

    input + p {
      display: none;
      color: var(--el-color-danger-light-3);
      font-size: .75rem;
      font-weight: bold;
    }

    input.error + p {
      display: block;
    }
  }
}
</style>
