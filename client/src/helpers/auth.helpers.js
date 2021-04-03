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

    let state = "";

    if(token){
        jwt.verify(token, process.env.REACT_APP_JWT, function(err, decode){
            if(err){
                state = false;
            }
            state = true
        })
    }

    if(state === true){
        return true
    } else {
        return false
    }
}