import request from '@/utils/request'

export function pageDict (parameter) {
  return request({
    url: '/system/dictionaries',
    method: 'get',
    params: parameter
  })
}

export function addDict (parameter) {
  return request({
    url: '/system/dictionaries',
    method: 'post',
    data: parameter
  })
}

export function modifyDict (parameter) {
  return request({
    url: '/system/dictionaries/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function removeDict (id) {
  return request({
    showLoading: true,
    url: '/system/dictionaries/' + id,
    method: 'delete'
  })
}

export function batchRemoveDict (parameter) {
  return request({
    showLoading: true,
    url: '/system/dictionaries/batch',
    method: 'post',
    data: parameter
  })
}
