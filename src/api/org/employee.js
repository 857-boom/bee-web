import request from '@/utils/request'

export function pageEmployee (parameter) {
  return request({
    url: '/org/employees',
    method: 'get',
    params: parameter
  })
}
