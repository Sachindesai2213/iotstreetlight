import { deleteCookie, getCookie, setCookie } from "./cookies"
// import { useAppContext } from "@src/context/state"

// const { setToken } = useAppContext()

export function login_user(data){
    const {user_id, username, devices} = data
    setCookie("user_id", user_id)
    setCookie("username", username)
    setCookie("devices", JSON.stringify(devices))
}

export function logout_user(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refresh_token");
    deleteCookie("user_id");
    // setToken(null)
    window.location.href = "/"
}

export function isUserLoggedIn(){
    const user_id = getCookie("user_id")
    return !!user_id
}