<template>
  <a-row :gutter="8">
    <a-col :span="4">
      <a-card :bordered="false">
        <a-input-search style="margin-bottom: 8px" placeholder="Search" />
        <a-tree
          @select="handleSelect"
          :treeData="orgTree"
          :load-data="onLoadData"
          :replaceFields="replaceFields"
        />
      </a-card>
    </a-col>
    <a-col :span="20">
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="工号">
                  <a-input v-model="queryParam.jobNumber" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="姓名">
                  <a-input v-model="queryParam.name" placeholder=""/>
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
          <a-button type="default" icon="sync" @click="handleResetPwd">重置密码</a-button>
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
          <span slot="enabled" slot-scope="text">
            <a-badge :status="text | enabledTypeFilter" :text="text | enabledFilter" />
          </span>
        </s-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { STable } from '@/components'
import { pageEmployee, resetPwd } from '@/api/org/employee'
import { tree } from '@/api/org/department'

export default {
  name: 'Employee',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      orgTree: [],
      replaceFields: {
        title: 'name',
        key: 'id',
        isLeaf: 'hasChildren'
      },
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '工号',
          dataIndex: 'jobNumber'
        },
        {
          title: '是否生效',
          dataIndex: 'enabled',
          scopedSlots: { customRender: 'enabled' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return pageEmployee(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  mounted () {
    this.getTree(0)
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    refresh () {
      this.$refs.table.refresh(true)
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleSelect (selectedKeys, info) {
      this.queryParam.departmentId = selectedKeys
      this.$refs.table.refresh(true)
    },
    onLoadData (treeNode) {
      const _this = this
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) { // 有值了直接渲染
          resolve()
          return
        }
        this.getTree(treeNode.dataRef.key).then(res => {
          treeNode.dataRef.children = res.result.data
          _this.orgTree = [..._this.orgTree]
        })
        resolve()
      })
    },
    getTree (parentId) {
      tree(parentId).then(res => {
        if (res.success) {
          this.orgTree = res.result
        }
      })
    },
    handleResetPwd () {
      const _this = this
      if (!this.selectedRowKeys.length > 0) {
        this.$message.error('请选择至少一条数据')
      } else {
        this.$confirm({
          title: '警告',
          content: '确定将选择账号密码重置为?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            resetPwd(_this.selectedRowKeys).then(res => {
              if (res.success) {
                _this.refresh()
                _this.$message.success('重置密码成功')
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
  }
}
</script>
