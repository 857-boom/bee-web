import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../../util'

const totalCount = 1101

const tree = (options) => {
  const result = []
  for (let i = 1; i < 5; i++) {
    const tmpKey = i
    result.push({
      key: tmpKey,
      id: tmpKey,
      name: 'name',
      hasChildren: Mock.mock({ 'boolean|1-2': true })
    })
  }

  return builder(result)
}

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
      name: 'name',
      enabled: Mock.mock('@integer(0, 1)')
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

Mock.mock(/\/org\/departments\/tree/, 'get', tree)
Mock.mock(/\/org\/departments/, 'get', serverList)
