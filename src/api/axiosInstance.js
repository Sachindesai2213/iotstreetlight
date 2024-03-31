import axios from "axios"
import { deleteCookie, getCookie, setCookie } from "@src/utils/cookies"
import jwtDecode from "jwt-decode"
import dayjs from "dayjs"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const createRequest = () => {

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {}
    })

    axiosInstance.interceptors.request.use(async (req) => {
        const jwt_token = getCookie()

        if(jwt_token){

            const tokenData = jwtDecode(jwt_token)
            const isExpired = dayjs.unix(tokenData.exp).diff(dayjs()) < 1;

            if (isExpired) {
                const refresh_token = getCookie("refresh_token")
                console.log(refresh_token)
                axios
                    .post(`${API_URL}/api/token/refresh`, {
                        refresh: refresh_token,
                    })
                    .then((response) => {
                        deleteCookie()
                        deleteCookie('refresh_token')
                        const auth_token = response.data.access;
                        setCookie("token", auth_token);
                        req.headers.Authorization = `Bearer ${auth_token}`;
                        return req;
                    })
            } else{
                req.headers = {
                    Authorization: `Bearer ${jwt_token}`
                }
            }
        }

        return req
    })

    axiosInstance.interceptors.response.use((response) => response, (error) => {
        if(error.response.status == 401){
        }
    })
    
    return axiosInstance
}

const api = createRequest()

export default api