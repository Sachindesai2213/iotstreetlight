import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let token = typeof window !== "undefined" ? window?.localStorage?.getItem("token") : null;

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` },
});

instance.interceptors.request.use(async req => {
    // if(!token){
    //     token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    //     req.headers.Authorization = `Bearer ${token?.access}`
    // }

    // const user = jwt_decode(token)
    // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // if(!isExpired) return req

    // const response = await axios.post(`${baseURL}/api/token/refresh/`, {
    //     refresh: token.refresh
    // });

    // localStorage.setItem('token', JSON.stringify(response.data))
    // req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})

export default instance;
