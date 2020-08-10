import Mock from 'mockjs2'
import { builder } from '../../util'

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

Mock.mock(/\/org\/department\/tree/, 'get', tree)
