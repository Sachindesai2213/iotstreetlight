import useSWR from "swr";
import { USER } from "./endpoints";
import { api } from "./wrapper";

function swr(variable, fxn){
    const response = useSWR(variable, fxn)
    return response.data
}

export const user = {
    login: (payload) => api.post(USER.LOGIN, payload),
    signup: (payload) => api.post(USER.SIGNUP, payload),
    meters: {
        all: (user_id) => swr(USER.METERS.ALL(user_id), () => api.get(USER.METERS.ALL(user_id))),
        create: (payload) => api.post(USER.METERS.CREATE, payload)
    }
}