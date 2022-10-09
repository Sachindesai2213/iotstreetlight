export const api = {
    get: (url) => fetchData("GET", url),
    post: (url, payload) => fetchData("POST", url, payload),
    put: (url, payload) => fetchData("PUT", url, payload)
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchData(method, url, payload){
    url = `${API_URL}${url}`
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    return response.json()
}