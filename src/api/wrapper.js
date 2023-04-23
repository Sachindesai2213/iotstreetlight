import instance from "./axiosInstance";

export const api = {
    get: (url) => fetchData("get", url),
    post: (url, payload) => fetchData("post", url, payload),
    put: (url, payload) => fetchData("put", url, payload),
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchData(method, url, payload) {
    url = `${API_URL}${url}`;
    let response;
    try {
        response = await instance[method](url, payload);
    } catch (error) {
        response = error.response;
    }
    return response;
}
