import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../../util'

const totalCount = 1101

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      code: 'No ' + tmpKey,
      name: 'name',
      value: tmpKey,
      sort: 0,
      description: '这是一段描述'
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

export const empty = req => {
  return builder({})
}

Mock.mock(/\/system\/dictionaries/, 'get', serverList)
Mock.mock(/\/system\/dictionaries/, 'post', serverList)
Mock.mock(/\/system\/dictionaries\/1/, 'put', empty)
Mock.mock(/\/system\/dictionaries/, 'delete', empty)
Mock.mock(/\/system\/dictionaries\/batch/, 'post', empty)
