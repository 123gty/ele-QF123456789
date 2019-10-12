import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {//获取
  return Cookies.get(TokenKey)
}

export function setToken(token) {//存入
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
