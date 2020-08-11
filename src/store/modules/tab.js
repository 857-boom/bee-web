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
      storage.set(TAB_TAG_LIST, state.tagList)
    },
    [TAB_TAG_REMOVE]: (state, route) => {
      state.tagList = state.tagList.filter(item => {
        return !diff(item, route)
      })
      storage.set(TAB_TAG_LIST, state.tagList)
    },
    [TAB_TAG_REMOVE_ALL]: (state) => {
      state.tagList = [state.tagWel]
      storage.set(TAB_TAG_LIST, state.tagList)
    },
    [TAB_TAG_REMOVE_OTHER]: (state) => {
      state.tagList = state.tagList.filter(item => {
        if (item.value === state.tag.value) {
          return true
        } else if (!defaultSettings.isFirstPage && item.value === defaultSettings.fistPage.value) {
          return true
        }
      })
      storage.set(TAB_TAG_LIST, state.tagList)
    }
  }
}

export default tab
