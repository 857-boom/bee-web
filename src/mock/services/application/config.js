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
      uri: 'http://uri',
      type: Mock.mock('@integer(1, 2)'),
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

const applicationTree = () => {
  return builder([
    {
      key: 'key-01',
      title: '业务系统',
      icon: 'mail',
      children: [
        {
        'key': 'key-01-01-01',
        'title': 'JAVA',
        'icon': null
        },
        {
          'key': 'key-01-01-02',
          'title': 'PHP',
          'icon': null
        },
        {
          'key': 'key-01-01-03',
          'title': 'Golang',
          'icon': null
        }
      ]
    },
    {
      key: 'key-02',
      title: '办公系统',
      icon: 'mail',
      children: [
        {
          'key': 'key-01-01-01',
          'title': 'JAVA',
          'icon': null
        },
        {
          'key': 'key-01-01-02',
          'title': 'PHP',
          'icon': null
        },
        {
          'key': 'key-01-01-03',
          'title': 'Golang',
          'icon': null
        }
      ]
    }
  ])
}

export const empty = req => {
  return builder({})
}

Mock.mock(/\/applications/, 'get', serverList)
Mock.mock(/\/applications\/tree/, 'get', applicationTree)
Mock.mock(/\/applications/, 'post', serverList)
Mock.mock(/\/applications\/1/, 'put', empty)
Mock.mock(/\/applications/, 'delete', empty)
Mock.mock(/\/applications\/batch/, 'post', empty)
