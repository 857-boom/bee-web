import request from '@/utils/request'

export function pageApplication (parameter) {
  return request({
    url: '/applications',
    method: 'get',
    params: parameter
  })
}

export function getApplicationTree () {
  return request({
    url: '/applications/tree',
    method: 'get'
  })
}

export function addApplication (parameter) {
  return request({
    url: '/applications',
    method: 'post',
    data: parameter
  })
}

export function modifyApplication (parameter) {
  return request({
    url: '/applications/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function removeApplication (id) {
  return request({
    showLoading: true,
    url: '/applications/' + id,
    method: 'delete'
  })
}

export function batchRemoveApplication (parameter) {
  return request({
    showLoading: true,
    url: '/applications/batch',
    method: 'post',
    data: parameter
  })
}
