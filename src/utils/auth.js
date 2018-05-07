import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

const NamePassword = 'NamePassword'

export function getNamePassword () {
  return Cookies.get(NamePassword)
}

export function setNamePassword (namePassword) {
  return Cookies.set(NamePassword, namePassword)
}

export function removeNamePassword () {
  return Cookies.remove(NamePassword)
}
