<template>
  <a-modal
    title="新建"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="菜单名称">
          <a-input
            placeholder="请输入菜单名称"
            v-decorator="['name', {rules: [{required: true, message: '请输入菜单名称'}, { min: 2, max: 15, message: '菜单名称长度为[2, 15]' }]}]" />
        </a-form-item>
        <a-form-item label="菜单编码">
          <a-input
            placeholder="请输入菜单编码"
            v-decorator="['code', {rules: [{required: true, message: '请输入菜单编码'}, { min: 2, max: 20, message: '菜单编码长度为[2, 20]' }]}]" />
        </a-form-item>
        <a-form-item label="路由地址">
          <a-input
            placeholder="请输入路由地址"
            v-decorator="['path']" />
        </a-form-item>
        <a-form-item label="上级菜单">
          <a-tree-select
            showSearch
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeMenu"
            placeholder="请选择上级菜单"
            treeDefaultExpandAll
            :treeDataSimpleMode="true"
            v-decorator="['parentId']"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item label="菜单图标">
          <a-input
            placeholder="请选择菜单图标"
            @click="chooseIcon"
            v-decorator="['icon', {rules: [{required: true, message: '请选择菜单图标'}]}]" >
            <a-icon slot="addonAfter" :type="iconType" />
          </a-input>
        </a-form-item>
        <a-form-item label="菜单类型">
          <a-radio-group v-decorator="['category']" name="category">
            <a-radio :value="1">
              菜单
            </a-radio>
            <a-radio :value="2">
              按钮
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-decorator="['sort']" :min="0" />
        </a-form-item>
      </a-form>
    </a-spin>
    <a-modal
      v-model="showIcon"
      :width="900"
      :mask="false"
      :footer="null"
      :afterClose="handleIconCancel"
    >
      <icon-selector @change="handleIconChange" />
    </a-modal>
  </a-modal>
</template>

<script>
import { IconSelector } from '@/components'
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'name', 'startTime', 'endTime']

export default {
  name: 'MenuForm',
  components: {
    IconSelector
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    },
    treeMenu: {
      type: Array,
      required: true
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this),
      imageUrl: '',
      imgLoading: false,
      iconType: '',
      showIcon: false
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    chooseIcon () {
      this.showIcon = true
    },
    handleIconCancel () {
      this.showIcon = false
    },
    handleIconChange (icon) {
      this.iconType = icon
      this.showIcon = false
      this.form.setFieldsValue({
        icon: icon
      })
    }
  }
}
</script>
