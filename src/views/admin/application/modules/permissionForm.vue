<template>
  <a-drawer
    class="permission-form"
    title="角色权限配置"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="() => { $emit('cancel') }"
  >
    <a-tabs tab-position="left">
      <a-tab-pane key="1" tab="菜单权限">
        <a-tree
          checkable
          :tree-data="treeData"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="数据权限">
        数据权限
      </a-tab-pane>
      <a-tab-pane key="3" tab="接口权限">
        接口权限
      </a-tab-pane>
    </a-tabs>
    <div class="footer">
      <a-button :style="{ marginRight: '8px' }" @click="() => { $emit('cancel') }">
        取消
      </a-button>
      <a-button type="primary">
        确定
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
export default {
  name: 'PermissionForm',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      treeData: []
    }
  }
}
</script>
<style lang="stylus">
.permission-form
  .footer
    position: absolute
    right: 0
    bottom: 0
    width: 100%
    border-top: 1px solid #e9e9e9
    padding: 10px 16px
    background: #fff
    text-align: right
    z-index: 1
</style>
