/**
 * 手机号验证
 * @param phone
 * @returns {boolean}
 */
export function testPhone (value) {
  const regex = /^1[3456789]\d{9}$/
  return test(regex, value)
}

/**
 * 邮箱验证
 * @param value
 * @returns {boolean}
 */
export function testEmail (value) {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return test(regex, value)
}

function test (regex, value) {
  if (!regex.test(value)) {
    return false
  } else {
    return true
  }
}
