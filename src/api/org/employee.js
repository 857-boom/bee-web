import request from '@/utils/request'

export function pageEmployee (parameter) {
  return request({
    url: '/org/employees',
    method: 'get',
    params: parameter
  })
}

export function resetPwd (parameter) {
  return request({
    url: '/org/employees/pwd/reset',
    method: 'put',
    data: parameter
  })
}
