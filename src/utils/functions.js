import { deleteCookie, getCookie, setCookie } from "./cookies"

export function login_user(data){
    const {user_id, username, devices} = data
    setCookie("user_id", user_id)
    setCookie("username", username)
    setCookie("devices", JSON.stringify(devices))
}

export function logout_user(){
    deleteCookie("user_id")
    deleteCookie("username")
    deleteCookie("devices")
    window.location.href = "/"
}

export function isUserLoggedIn(){
    const user_id = getCookie("user_id")
    return !!user_id
}