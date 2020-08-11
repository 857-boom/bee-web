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
      name: 'name',
      code: 'code',
      sort: Mock.mock('@integer(1, 10)')
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

Mock.mock(/\/application\/roles/, 'get', serverList)
Mock.mock(/\/application\/roles/, 'post', serverList)
Mock.mock(/\/application\/roles\/1/, 'put', empty)
Mock.mock(/\/application\/roles/, 'delete', empty)
Mock.mock(/\/application\/roles\/batch/, 'post', empty)
