<script setup lang="ts">
import {defineComponent, ref} from 'vue'
import Tip from "@/components/Tip.vue";
import Dialog from "@/components/Dialog.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import {useDark} from "@vueuse/core";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import SelectIcon from "@/components/icons/SelectIcon.vue";
import SettingItem from "@/components/Setting/SettingItem.vue";
import {useBackgroundListStore, useConfigStore, useEngineListStore} from "@/stores";

defineComponent({
  name: "Setting",
})

const configStore = useConfigStore()
const engineListStore = useEngineListStore();
const backgroundListStore = useBackgroundListStore();

const engineDialogVisible = ref(false);
const isEngineOperation = ref(false);
const isBgOperation = ref(false);
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

const backgroundDialogVisible = ref(false);
const background = ref({
  value: '',
  revise: true,
  solid: false,
})
const backgroundUrlInput = ref()

const resetForm = () => {
  index.value = 0
  engine.value = {
    name: '',
    url: '',
    icon: '',
    revise: true,
  }
  background.value = {
    value: '',
    revise: true,
    solid: false,
  }
  nameInput.value.classList.remove('error')
  iconInput.value.classList.remove('error')
  urlInput.value.classList.remove('error')
  backgroundUrlInput.value.classList.remove('error')
}

const deleteEngine = (number: number) => {
  if (configStore.getEngine().url === engineListStore.getEngine(number).url) {
    configStore.setEngine(
        engineListStore.getEngine(0)
    )
  }
  engineListStore.deleteEngine(number)
}

const closeEngineDialog = () => {
  engineDialogVisible.value = false;
  resetForm()
}

const addEngine = () => {
  resetForm()
  title.value = '添加搜索引擎'
  engineDialogVisible.value = true;
}

const doAddEngine = () => {
  engineListStore.addEngine(engine.value)
  closeEngineDialog()
}

const updateEngine = (i: number, value: any) => {
  resetForm()
  value = {
    name: value.name,
    url: value.url,
    icon: value.icon,
    revise: value.revise,
  } // 解绑 ref
  title.value = '修改搜索引擎'
  index.value = i
  engine.value = value
  engineDialogVisible.value = true;
}

const doUpdateEngine = () => {
  engineListStore.engineList[index.value] = engine.value
  closeEngineDialog()
}

const engineOnSure = () => {

  if (!verifyEngine()) return

  if (index.value === 0) {
    doAddEngine()
  } else {
    doUpdateEngine()
  }
}

// 验证
const verifyEngine = () => {
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

const openBackgroundDialog = ()=> {
  resetForm()
  backgroundDialogVisible.value = true
}

const closeBackgroundDialog = ()=> {
  backgroundDialogVisible.value = false
  resetForm()
}

const addBackground = () => {
  if (!background.value.value) {
    backgroundUrlInput.value.classList.add('error')
    return
  }
  backgroundListStore.addBackground(background.value)
  configStore.setBackground(background.value)
  closeBackgroundDialog()
}

const deleteBackground = (i: number) => {
  if (configStore.getBackground()?.value === backgroundListStore.getBackground(i).value) {
    configStore.setBackground(backgroundListStore.getBackground(0))
  }
  backgroundListStore.deleteBackground(i)
}
</script>

<template>
  <div class="start-setting">
    <div class="setting-body">
      <SettingItem title="搜索引擎" :revise="true" v-model="isEngineOperation">
        <div class="content-engine content">
          <div class="engine-item"
               v-for="(engine, index) in engineListStore.engineList"
               :key="index"
               :class="{active: configStore.getEngine().url === engine.url}"
               @click="configStore.setEngine(engine)"
          >
            <div class="engine-operation left"
                 v-if="isEngineOperation&&engine.revise"
                 @click.stop
            >
              <edit-icon @click="updateEngine(index, engine)"/>
            </div>
            <div class="engine-icon"
                 :style="{backgroundImage: `url(${engine.icon})`}"></div>
            <div class="text">{{engine.name}}</div>
            <div class="engine-operation"
                 v-if="isEngineOperation&&engine.revise"
                 @click.stop
            >
              <delete-icon @click="deleteEngine(index)"/>
            </div>
          </div>
          <div class="engine-item" title="添加" @click="addEngine()">
            <add-icon/>
          </div>
          <Tip style="margin-top: 10px"
               msg="若图标无法正常显示，则表明你所在区域无法使用该搜索引擎！"
               type="warning"
          />
        </div>
      </SettingItem>

      <SettingItem title="主题" :revise="false">
        <div class="content-theme content">
          <div class="theme-item"
               :class="{active: !isDark}"
               @click="isDark = false"
          >
            <div class="text theme">
              浅色
            </div>
          </div>
          <div class="theme-item"
               :class="{active: isDark}"
               @click="isDark = true"
          >
            <div class="text theme">
              深色
            </div>
          </div>
        </div>
      </SettingItem>

      <SettingItem title="背景" :revise="true" v-model="isBgOperation">
          <div class="background-item"
               v-for="(background, index) in backgroundListStore.backgroundList"
               :class="{active: configStore.getBackground()?.value === background.value}"
               @click="configStore.setBackground(backgroundListStore.backgroundList[index])"
          >
            <div class="selected">
              <select-icon/>
            </div>
            <div :style="`background-image: url('${background.value}')`" class="image"
                 v-if="background.value!==''"
            />
            <div v-else>
              默认
            </div>
            <div class="background-operation"
                 v-if="isBgOperation && background.revise"
                 @click="deleteBackground(index)"
            >
              <delete-icon/>
            </div>
          </div>
          <div class="background-item"
               style=""
               @click="openBackgroundDialog()"
          >
            <add-icon/>
          </div>
      </SettingItem>

    </div>
  </div>

  <Dialog v-model="engineDialogVisible"
          :on-sure="engineOnSure">
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
                   @change="verifyEngine"
                   placeholder="请输入搜索引擎名称"
            >
            <p>名称不能为空</p>
          </div>
        </div>
        <div class="form-item">
          <label for="engine-icon">图标:</label>
          <div>
            <input type="text"
                   id="engine-icon"
                   v-model="engine.icon"
                   ref="iconInput"
                   @change="verifyEngine"
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
                   @change="verifyEngine"
                   placeholder="请输入搜索引擎网址"
            >
            <p>网址不能为空</p>
          </div>
        </div>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="backgroundDialogVisible"
          :on-sure="addBackground">
    <template #title>
      添加背景
    </template>
    <template #content>
      <div class="background-form">
        <div class="form-item">
          <label for="value">地址:</label>
          <div>
            <input type="text"
                   id="value"
                   v-model="background.value"
                   placeholder="请输入图片地址"
                   ref="backgroundUrlInput"
            >
            <p>图片地址不能为空</p>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.start-setting {
  .setting-body {
      .setting-item-content {
        .content {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

      .background-item,
      .theme-item,
      .engine-item {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        border: 2px solid var(--el-color-info-light-7);
        border-radius: 10px;

        transition: all 0.25s ease-in-out;

        .text {
          font-size: .8rem;
          font-weight: bold;

          &.theme {
            padding: 0 10px;
          }
        }

        &.active {
          border-color: var(--el-color-primary-light-3);
          background-color: var(--el-color-primary-light-8);
        }
      }


      .engine-item {
        .engine-operation {
          display: flex;
          align-items: center;
          flex-direction: row;

          position: relative;
          right: -5px;

          &.left {
            left: -5px;
            margin-right: 1px;
          }

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
      }

      .background-item {
        width: 103px;
        height: 103px;
        padding: 0;
        position: relative;
        justify-content: center;

        .image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          border-radius: 10px;
        }

        .selected {
          display: none;
        }

        &.active {
          .selected {
            display: block;
            position: absolute;
            top: -8px;
            right: -8px;

            svg {
              width: 25px;
              height: 25px;
              background-color: var(--color-background);
              fill: var(--el-color-primary);
              border-radius: 50%;
            }
          }
        }

        img {
          width: 100px;
          height: 100px;

          border-radius: 10px;

          object-fit: cover;
        }

        .background-operation {
          display: flex;
          padding: 5px;
          border-radius: 50%;
          background-color: var(--el-overlay-color);
          backdrop-filter: blur(5px);
          position: absolute;
          //居中
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

  }
}

.background-form,
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
      width: 320px;
      line-height: 45px;
      padding: 0 10px;
      border: 1.5px solid var(--el-color-info-light-3);
      border-radius: 4px;
      outline: none;

      text-overflow: ellipsis;

      color: var(--color-text);

      @media (max-width: 410px) {
        width: 280px;
      }

      @media (max-width: 360px) {
        width: 260px;
      }

      &.error {
        border-color: var(--el-color-danger-light-3);
        color: var(--el-color-danger);
      }

      &:focus {
        border-color: var(--el-color-primary-light-3);
        color: var(--color-text);
      }
    }

    input + p {
      display: none;
      color: var(--el-color-danger);
      font-size: .75rem;
      font-weight: bold;
    }

    input.error + p {
      display: block;
    }
  }
}
</style>
