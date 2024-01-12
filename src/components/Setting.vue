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
import {useBackgroundStore} from "@/stores/background";
import {useBackgroundListStore} from "@/stores/backgroundList";
import SelectIcon from "@/components/icons/SelectIcon.vue";

defineComponent({
  name: "Setting",
})

const engineStore = useEngineStore();
const engineListStore = useEngineListStore();
const backgroundStore = useBackgroundStore();
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

const deleteEngine = (number: number) => {
  if (engineStore.engine === engineListStore.engines[number].url) {
    engineStore.setEngine(engineListStore.engines[0].url)
  }
  engineListStore.deleteEngine(number)
}

const openEngineDialog = () => {
  engineDialogVisible.value = true;
}

const closeEngineDialog = () => {
  engineDialogVisible.value = false;
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

const addEngine = () => {
  title.value = '添加搜索引擎'
  openEngineDialog()
}

const doAddEngine = () => {
  engineListStore.addEngine(engine.value)
  closeEngineDialog()
}

const updateEngine = (i: number, value: any) => {
  value = {
    name: value.name,
    url: value.url,
    icon: value.icon,
    revise: value.revise,
  } // 解绑 ref
  title.value = '修改搜索引擎'
  index.value = i
  engine.value = value
  openEngineDialog()
}

const doUpdateEngine = () => {
  engineListStore.engines[index.value] = engine.value
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
  backgroundDialogVisible.value = true
}

const closeBackgroundDialog = ()=> {
  backgroundDialogVisible.value = false
  reset()
}

const addBackground = () => {
  if (!background.value.value) {
    backgroundUrlInput.value.classList.add('error')
    return
  }
  backgroundListStore.addBackground(background.value)
  backgroundStore.background = background.value
  closeBackgroundDialog()
}

const deleteBackground = (i: number) => {
  if (backgroundStore.background?.value === backgroundListStore.backgrounds[i].value) {
    backgroundStore.setBackground(null)
  }
  backgroundListStore.deleteBackground(i)
}
</script>

<template>
  <div class="setting-area">
    <div class="setting-body">
      <div class="setting-item">
        <div class="setting-item-title">
          <span>搜索引擎</span>
          <div class="setting-item-operation">
            <revise-icon @click="isEngineOperation=!isEngineOperation"
                         title="编辑"
                         class="button"
                         :class="{active: isEngineOperation}"
            />
            <tip msg="再次点击，关闭编辑" type="warning" v-if="isEngineOperation"/>
          </div>
        </div>
        <div class="setting-item-content">
          <div class="content-item-engine"
               v-for="(engine, number) in engineListStore.engines"
               :key="engine.name"
               :class="{active: engineStore.engine === engine.url}"
               @click="engineStore.engine = engine.url"
          >
            <div class="engine-icon"
                 :style="{backgroundImage: `url(${engine.icon})`}"></div>
            <div class="text">{{engine.name}}</div>
            <div class="engine-operation" v-if="isEngineOperation&&engine.revise" @click.stop>
              <edit-icon @click="updateEngine(number, engine)"/>
              <delete-icon @click="deleteEngine(number)"/>
            </div>
          </div>
          <div class="content-item-engine" title="添加" @click="addEngine()">
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
          <div class="content-item-theme"
                :class="{active: !isDark}"
                @click="isDark = false"
          >
            <div class="text theme">
              浅色
            </div>
          </div>
          <div class="content-item-theme"
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
          <div class="setting-item-operation">
            <revise-icon @click="isBgOperation=!isBgOperation"
                         title="编辑"
                         class="button"
                         :class="{active: isBgOperation}"
            />
            <tip msg="再次点击，关闭编辑" type="warning" v-if="isBgOperation"/>
          </div>
        </div>
        <div class="setting-item-content">
          <div class="setting-item-content">
            <div class="content-item-bg"
                 style="width: 100px"
                 :class="{active: !backgroundStore.background}"
                  @click="backgroundStore.setBackground(null)"
            >
              <div class="selected">
                <select-icon/>
              </div>
              默认
            </div>
          </div>
          <div class="content-item-bg"
               v-for="(background, number) in backgroundListStore.backgrounds"
                :class="{active: backgroundStore.background?.value === background.value}"
                @click="backgroundStore.setBackground(backgroundListStore.backgrounds[number])"
          >
            <div class="selected">
              <select-icon/>
            </div>
            <img :src="background.value" class="image" alt="bg"/>
            <div class="background-operation"
                 v-if="isBgOperation"
                 @click="deleteBackground(number)"
            >
              <delete-icon/>
            </div>
          </div>
          <div class="setting-item-content">
            <div class="content-item-bg"
                 style=""
                 @click="openBackgroundDialog()"
            >
              <add-icon/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog :on-close="closeEngineDialog"
          :visible="engineDialogVisible"
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

  <Dialog :on-close="closeBackgroundDialog"
          :visible="backgroundDialogVisible"
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

        .setting-item-operation {
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
        gap: 10px;

        .content-item-bg,
        .content-item-theme,
        .content-item-engine {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          border: 2px solid var(--el-color-info-light-7);
          border-radius: 10px;

          transition: all 0.25s ease-in-out;

          .engine-operation {
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
            border-color: var(--el-color-primary-light-3);
            background-color: var(--el-color-primary-light-8);
          }
        }

        .content-item-bg {
          width: 103px;
          height: 103px;
          padding: 0;
          position: relative;
          justify-content: center;

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

      color: var(--color-text);

      @media (max-width: 410px) {
        width: 280px;
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
