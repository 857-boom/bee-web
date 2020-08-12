<template>
  <a-row :gutter="8">
    <a-col :span="4">
      <a-card :bordered="false">
        <s-tree
          :dataSource="applicationTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"></s-tree>
      </a-card>
    </a-col>
    <a-col :span="20">
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="菜单名称">
                  <a-input v-model="queryParam.name" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="菜单编号">
                  <a-input v-model="queryParam.code" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item>
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <s-table
          ref="table"
          bordered
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :rowSelection="rowSelection"
          showPagination="auto"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleRemove(record)">删除</a>
            </template>
          </span>
        </s-table>
        <menu-form
          ref="createModal"
          :visible="visible"
          :loading="confirmLoading"
          :model="mdl"
          :treeMenu="treeMenu"
          @cancel="handleCancel"
          @ok="handleOk"
        />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { STable, STree } from '@/components'
import {
  pageApplicationMenu,
  addMenu,
  modifyMenu,
  removeMenu,
  batchRemoveMenu
} from '@/api/application/menu'
import { getApplicationTree } from '@/api/application/config'
import MenuForm from './modules/menuForm'
export default {
  name: 'Menu',
  components: {
    STable,
    STree,
    MenuForm
  },
  data () {
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      treeMenu: [],
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '菜单名称',
          dataIndex: 'name'
        },
        {
          title: '路由地址',
          dataIndex: 'path'
        },
        {
          title: '菜单图标',
          dataIndex: 'icon'
        },
        {
          title: '菜单编号',
          dataIndex: 'code'
        },
        {
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return pageApplicationMenu(requestParameters)
          .then(res => {
            this.treeMenu = []
            this.assemblyTree(res.result.data)
            return res.result
          })
      },
      applicationTree: [],
      openKeys: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  mounted () {
    getApplicationTree().then(res => {
      if (res.success) {
        this.applicationTree = res.result
      }
    })
  },
  methods: {
    refresh () {
      this.$refs.table.refresh(true)
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleClick (e) {
      this.queryParam.applicationId = e.key
      this.$refs.table.refresh(true)
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleRemove (record) {
      const _this = this
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${record.name} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          removeMenu(record.id).then(res => {
            if (res.success) {
              // _this.refresh()
              _this.$message.success('删除成功')
            } else {
              _this.$message.warning(res.msg)
            }
          })
        },
        onCancel () {
        }
      })
    },
    handleMenuClick (e) {
      const _this = this
      if (e.key === '1') {
        if (!this.selectedRowKeys.length > 0) {
          this.$message.error('请勾选要操作的数据')
        } else {
          this.$confirm({
            title: '警告',
            content: '真的要删除选中的数据吗?',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk () {
              batchRemoveMenu(_this.selectedRowKeys).then(res => {
                if (res.success) {
                  _this.refresh()
                  _this.$message.success('删除成功')
                } else {
                  _this.$message.warning(res.msg)
                }
              })
            },
            onCancel () {
            }
          })
        }
      }
    },
    handleOk () {
      const _this = this
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          if (values.id > 0) {
            // 修改 e.g.
            modifyMenu(values).then(res => {
              if (res.success) {
                _this.visible = false
                _this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                _this.refresh()
                _this.$message.success('修改成功')
              } else {
                _this.$message.warning(res.msg)
              }
            })
          } else {
            // 新增
            addMenu(values).then(res => {
              if (res.success) {
                _this.visible = false
                _this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                _this.refresh()
                _this.$message.success('新增成功')
              } else {
                _this.$message.warning(res.msg)
              }
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields()
    },
    assemblyTree (data) {
      data.forEach(item => {
        this.treeMenu.push({
          id: item.id,
          pId: item.parentId,
          label: item.name,
          value: item.id
        })
        if (item.children) {
          this.assemblyTree(item.children)
        }
      })
    }
  }
}
</script>
