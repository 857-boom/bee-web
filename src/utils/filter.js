import Vue from 'vue'

const enableMap = {
  0: {
    status: 'success',
    text: '启用'
  },
  1: {
    status: 'error',
    text: '禁用'
  }
}

Vue.filter('enabledFilter', function (value) {
  return enableMap[value].text
})

Vue.filter('enabledTypeFilter', function (value) {
  return enableMap[value].status
})
