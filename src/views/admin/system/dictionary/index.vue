<template>
  <page-header-wrapper>
    <a-row :gutter="8">
      <a-col :span="12">
        <list/>
      </a-col>
      <a-col :span="12">
        <detail-list/>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>

import List from './components/list'
import DetailList from './components/detailList'
export default {
  name: 'Index',
  components: {
    List,
    DetailList
  }

}
</script>
