import Cookies from 'js-cookie';

export function getCookie(name) {
    const cookie = Cookies.get(name)
    return cookie
}

export function setCookie(name, value) {
    Cookies.set(name, value, { path: '/'})
}

export function deleteCookie(name) {
    document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
}