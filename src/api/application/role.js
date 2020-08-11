import request from '@/utils/request'

export function pageRole (parameter) {
  return request({
    url: '/application/roles',
    method: 'get',
    params: parameter
  })
}

export function addRole (parameter) {
  return request({
    url: '/application/roles',
    method: 'post',
    data: parameter
  })
}

export function modifyRole (parameter) {
  return request({
    url: '/application/roles/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function removeRole (id) {
  return request({
    showLoading: true,
    url: '/application/roles/' + id,
    method: 'delete'
  })
}

export function batchRemoveRole (parameter) {
  return request({
    showLoading: true,
    url: '/application/roles/batch',
    method: 'post',
    data: parameter
  })
}
