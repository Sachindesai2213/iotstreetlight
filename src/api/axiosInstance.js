import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { deleteCookie } from "../utils/cookies";
// import { useRouter } from "next/router";
// import { useAppContext } from "@src/context/state";

// const router = useRouter()

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const { token } = useAppContext();

let auth_token =
    typeof window !== "undefined"
        ? window?.localStorage?.getItem("token")
        : null;

let refresh_token =
    typeof window !== "undefined"
        ? window?.localStorage?.getItem("refresh_token")
        : null;

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
        Authorization: `Bearer ${auth_token}`,
    },
});

// instance.interceptors.request.use(async (req) => {
//     // console.log(req)

//     if (!auth_token) {
//         auth_token = window?.localStorage?.getItem("token")
//             ? window?.localStorage?.getItem("token")
//             : null;

//         let refresh_token = window?.localStorage?.getItem("refresh_token")
//             ? window?.localStorage?.getItem("refresh_token")
//             : null;
//     }

//     // if (!auth_token) return req;

//     // const user = jwt_decode(auth_token);
//     // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     // console.log(user);

//     // req.headers.Authorization = `Bearer ${auth_token}`;

//     // if (!isExpired || !auth_token) return req;

//     // console.log("Expired");

//     // const { data, status } = await axios.post(`${API_URL}/api/token/refresh`, {
//     //     refresh: refresh_token,
//     // });

//     // console.log(status);

//     // if (status != 200) {
//     //     window.localStorage.removeItem("token");
//     //     window.localStorage.removeItem("refresh_token");
//     //     deleteCookie("user_id");
//     //     // router.push('/login')
//     // }

//     // auth_token = data.access;

//     // localStorage.setItem("token", auth_token);
//     req.headers.Authorization = `Bearer ${auth_token}`;
//     return req;
// });

export default instance;
