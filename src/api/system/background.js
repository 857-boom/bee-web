import request from '@/utils/request'

export function pageBackground (parameter) {
  return request({
    url: '/system/backgrounds',
    method: 'get',
    params: parameter
  })
}

export function addBackground (parameter) {
  return request({
    url: '/system/backgrounds',
    method: 'post',
    data: parameter
  })
}

export function modifyBackground (parameter) {
  return request({
    url: '/system/backgrounds/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function removeBackground (id) {
  return request({
    showLoading: true,
    url: '/system/backgrounds/' + id,
    method: 'delete'
  })
}

export function batchRemoveBackground (parameter) {
  return request({
    showLoading: true,
    url: '/system/backgrounds/batch',
    method: 'post',
    data: parameter
  })
}
