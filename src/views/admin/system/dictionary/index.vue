<template>
  <page-header-wrapper>
    <a-row :gutter="24">
      <a-col :span="12">
        <a-card title="字典列表" :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="字典编号">
                    <a-input v-model="queryParam.code" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="字典名称">
                    <a-input v-model="queryParam.name" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item>
                    <a-button type="primary" >查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="table-operator">
            <a-button type="primary" icon="plus">新建</a-button>
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                批量操作 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </div>
          <s-table
            ref="table"
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
            <span slot="action">
              <template>
                <a>编辑</a>
                <a-divider type="vertical" />
                <a>删除</a>
              </template>
            </span>
          </s-table>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="字典详情" :bordered="false">
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
  import { pageDict } from '@/api/system/dictionary'
  import { STable } from '@/components'
  export default {
    name: 'Dict',
    components: {
      STable
    },
    data () {
      return {
        // 查询参数
        queryParam: {},
        columns: [
          {
            title: '#',
            scopedSlots: { customRender: 'serial' }
          },
          {
            title: '字典编号',
            dataIndex: 'code'
          },
          {
            title: '字典名称',
            dataIndex: 'name'
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
          console.log('loadData request parameters:', requestParameters)
          return pageDict(requestParameters)
            .then(res => {
              return res.result
            })
        },
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
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    }

  }
</script>
