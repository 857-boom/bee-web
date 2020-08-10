import request from '@/utils/request'

export function tree (parameter) {
  return request({
    url: '/org/department/tree',
    method: 'get',
    params: parameter
  })
}
