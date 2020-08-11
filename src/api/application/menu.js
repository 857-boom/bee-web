import request from '@/utils/request'

export function pageApplicationMenu (parameter) {
  return request({
    url: '/application/menus',
    method: 'get',
    params: parameter
  })
}

export function addMenu (parameter) {
  return request({
    url: '/application/menus',
    method: 'post',
    data: parameter
  })
}

export function modifyMenu (parameter) {
  return request({
    url: '/application/menus/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function removeMenu (id) {
  return request({
    showLoading: true,
    url: '/application/menus/' + id,
    method: 'delete'
  })
}

export function batchRemoveMenu (parameter) {
  return request({
    showLoading: true,
    url: '/application/menus/batch',
    method: 'post',
    data: parameter
  })
}
