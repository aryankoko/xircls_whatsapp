import jwtDecode from "jwt-decode"
import Cookies from 'js-cookie'

export const TOKEN_KEY = 'xircls_user_token'

export const getToken = () => {
    // return localStorage.getItem(TOKEN_KEY)
    return Cookies.get(TOKEN_KEY)
}

export const getUserPermission = () => {
    return localStorage.getItem('userPermission')
}

export const setToken = (token, app) => {
    // localStorage.setItem(TOKEN_KEY, token)
    Cookies.set(TOKEN_KEY, token, { expires: 2, path: '/' })
    if (app) {
        localStorage.setItem('app_name', app)
    }
}

export const removeToken = () => {
    // localStorage.removeItem(TOKEN_KEY)
    Cookies.remove(TOKEN_KEY)
    localStorage.removeItem("userPermission")
}

export const decodeToken = () => {
    const token = getToken()
    if (token) {
        const decodedToken = jwtDecode(token)
        return decodedToken
    }
    return null
}

export const appName = () => {
    return "infiniti"
} 
