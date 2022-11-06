import useSWR from "swr";
import { USERS } from "./endpoints";
import { api } from "./wrapper";

function swr(variable, fxn){
    const response = useSWR(variable, fxn)
    return response.data
}

export const user = {
    login: (payload) => api.post(USERS.LOGIN, payload),
    signup: (payload) => api.post(USERS.SIGNUP, payload),
    meters: {
        all: (user_id) => swr(USERS.METERS.ALL(user_id), () => api.get(USERS.METERS.ALL(user_id))),
        create: (payload) => api.post(USERS.METERS.CREATE, payload),

        parameters: {
            create: (payload) => api.post(USERS.METERS.PARAMETERS.CREATE, payload),
        }
    },
    activities: {
        all: (user_id) => swr(USERS.ACTIVITIES.ALL(user_id), () => api.get(USERS.ACTIVITIES.ALL(user_id)))
    },
    reports: {
        all: (payload) => swr(USERS.REPORTS.ALL(payload), () => api.get(USERS.REPORTS.ALL(payload)))
    }
}