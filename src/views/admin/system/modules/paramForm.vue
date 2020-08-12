<template>
  <a-modal
    title="新增"
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
        <a-form-item label="参数名称">
          <a-input
            placeholder="请输入参数名称"
            v-decorator="['name', {rules: [{required: true, min: 3, max: 10, message: '请输入参数名称'}]}]" />
        </a-form-item>
        <a-form-item label="参数键名">
          <a-input
            placeholder="请输入参数键名"
            v-decorator="['key', {rules: [{required: true, message: '请输入参数键名'}]}]" />
        </a-form-item>
        <a-form-item label="参数键值">
          <a-input
            placeholder="请输入参数键值"
            v-decorator="['value', {rules: [{required: true, message: '请输入参数键值'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'code', 'name', 'value']

export default {
  name: 'ParamForm',
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
      form: this.$form.createForm(this)
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
  }
}
</script>
