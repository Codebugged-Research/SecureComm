const jwt = require('jsonwebtoken');

export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, value)
    }
}

export const removeLocalStorage = key => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

export const authenticate = (response) => {
    setLocalStorage('token', response.data.token)
    setLocalStorage('user', response.data.name)
}

export const signout = () => {
    removeLocalStorage('user')
    removeLocalStorage('token')
}

export const isAuth = (token) => {
    if(token){
        jwt.decode(token, process.env.REACT_APP_JWT, (err, decode) => {
            if(err || !decode){
                return false
            }
            return true
        })
    }
}