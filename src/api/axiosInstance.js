import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { deleteCookie } from "../utils/cookies";
import { logout_user } from "@src/utils/functions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    headers: { Authorization: `Bearer ${auth_token}` },
});

instance.interceptors.request.use(async (req) => {
    if (!auth_token) {
        auth_token = window?.localStorage?.getItem("token")
            ? window?.localStorage?.getItem("token")
            : null;

        let refresh_token = window?.localStorage?.getItem("refresh_token")
            ? window?.localStorage?.getItem("refresh_token")
            : null;
    }

    if (!auth_token) return req;

    const user = jwt_decode(auth_token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    req.headers.Authorization = `Bearer ${auth_token}`;

    if (!isExpired || !auth_token) return req;

    axios
        .post(`${API_URL}/api/token/refresh`, {
            refresh: refresh_token,
        })
        .then((response) => {
            auth_token = response.data.access;
            window.localStorage.setItem("token", auth_token);
            req.headers.Authorization = `Bearer ${auth_token}`;
            return req;
        })
        .catch((err) => logout_user());
});

export default instance;
