import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {//获取
  return Cookies.get(TokenKey)
}

let d = new Date();
export function setToken(token) {//存入
  return Cookies.set(TokenKey, token,{expires:1,path:''})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// cookies.set（'name'，'value'，{expires:7，path:'}）；