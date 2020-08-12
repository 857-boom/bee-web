import storage from 'store'
import { diff } from '@/utils/util'
import defaultSettings from '@/config/defaultSettings'

import {
  TAB_TAG,
  TAB_TAG_LIST,
  TAB_TAG_REMOVE,
  TAB_TAG_REMOVE_ALL,
  TAB_TAG_REMOVE_OTHER
} from '@/store/mutation-types'

// 处理首个标签
function setFistTag (list) {
  if (list.length === 1) {
    list[0].close = false
  } else {
    list.forEach(ele => {
      if (ele.fullPath === defaultSettings.fistPage.fullPath && defaultSettings.isFirstPage === false) {
        ele.close = false
      } else {
        ele.close = true
      }
    })
  }
}

const tab = {
  state: {
    tagList: storage.get(TAB_TAG_LIST) || [],
    tag: storage.get(TAB_TAG),
    tagFirst: defaultSettings.fistPage
  },
  mutations: {
    [TAB_TAG]: (state, route) => {
      state.tag = route
      storage.set(TAB_TAG, route)
      if (state.tagList.some(ele => diff(ele, route))) return
      state.tagList.push(route)
      setFistTag(state.tagList)
      storage.set(TAB_TAG_LIST, state.tagList)
    },
    [TAB_TAG_REMOVE]: (state, route) => {
      state.tagList = state.tagList.filter(item => {
        return !diff(item, route)
      })
      setFistTag(state.tagList)
      storage.set(TAB_TAG_LIST, state.tagList)
    },
    [TAB_TAG_REMOVE_ALL]: (state) => {
      state.tagList = [state.tagFirst]
      storage.set(TAB_TAG_LIST, state.tagList)
    },
    [TAB_TAG_REMOVE_OTHER]: (state) => {
      state.tagList = state.tagList.filter(item => {
        if (item.fullPath === state.tag.fullPath) {
          return true
        } else if (!defaultSettings.isFirstPage && item.fullPath === defaultSettings.fistPage.fullPath) {
          return true
        }
      })
      setFistTag(state.tagList)
      storage.set(TAB_TAG_LIST, state.tagList)
    }
  }
}

export default tab
