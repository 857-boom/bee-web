import request from '@/utils/request'

export function pageParam (parameter) {
  return request({
    url: '/system/params',
    method: 'get',
    params: parameter
  })
}

export function addParam (parameter) {
  return request({
    url: '/system/params',
    method: 'post',
    data: parameter
  })
}

export function modifyParam (parameter) {
  return request({
    url: '/system/params/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function removeParam (id) {
  return request({
    showLoading: true,
    url: '/system/params/' + id,
    method: 'delete'
  })
}

export function batchRemoveParam (parameter) {
  return request({
    showLoading: true,
    url: '/system/params/batch',
    method: 'post',
    data: parameter
  })
}
