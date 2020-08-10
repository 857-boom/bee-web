<template>
  <page-header-wrapper>
    <a-row :gutter="8">
      <a-col :span="4">
        <a-card :bordered="false">

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
          </s-table>
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { pageEmployee } from '@/api/org/employee'

export default {
  name: 'Employee',
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
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '工号',
          dataIndex: 'jobNumber'
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
      }
    }
  }
}
</script>
