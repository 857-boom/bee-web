import request from '@/utils/request'

export function tree (parameter) {
  return request({
    url: '/org/departments/tree',
    method: 'get',
    params: parameter
  })
}

export function pageDepartment (parameter) {
  return request({
    url: '/org/departments',
    method: 'get',
    params: parameter
  })
}
