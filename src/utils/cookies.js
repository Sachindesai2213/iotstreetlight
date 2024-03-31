import Cookies from 'js-cookie';

export function getCookie(name = "token") {
    // const cookie = Cookies.get(name)
    if(process.browser){
        const cookie = localStorage.getItem(name)
        return cookie
    }
}

export function setCookie(name = "token", value) {
    // Cookies.set(name, value, { path: '/'})
    localStorage.setItem(name, value, { path: '/'})
}

export function deleteCookie(name = "token") {
    // document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT"
    localStorage.removeItem(name)
}