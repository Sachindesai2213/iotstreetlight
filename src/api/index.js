import useSWR from "swr";
import { USERS } from "./endpoints";
import { api } from "./wrapper";

function swr(variable, fxn) {
    const response = useSWR(variable, fxn, {
        revalidateOnFocus: false
    });
    return response.data;
}

export const user = {
    login: (payload) => api.post(USERS.LOGIN, payload),
    signup: (payload) => api.post(USERS.SIGNUP, payload),
    profile: {
        get: () =>
            swr(USERS.PROFILE.GET(), () =>
                api.get(USERS.PROFILE.GET())
            ),
        update: (payload) => api.post(USERS.PROFILE.UPDATE, payload),
    },
    dashboardData: {
        get: () =>
            swr(USERS.DASHBOARD_DATA.GET(), () =>
                api.get(USERS.DASHBOARD_DATA.GET())
            ),
    },
    devices: {
        all: () =>
            swr(USERS.DEVICES.ALL(), () =>
                api.get(USERS.DEVICES.ALL())
            ),
        create: (payload) => api.post(USERS.DEVICES.CREATE, payload),
        parameters: {
            create: (payload) =>
                api.post(USERS.DEVICES.PARAMETERS.CREATE, payload),
        },
        configurations: {
            create: (payload) =>
                api.post(USERS.DEVICES.CONFIGURATIONS.CREATE, payload),
            push: (payload) => {
                api.put(USERS.DEVICES.CONFIGURATIONS.PUSH, payload)
            }
        }
    },
    activities: {
        all: (user_id) =>
            swr(USERS.ACTIVITIES.ALL(user_id), () =>
                api.get(USERS.ACTIVITIES.ALL(user_id))
            ),
    },
    reports: {
        all: (payload) =>
            swr(USERS.REPORTS.ALL(payload), () =>
                api.get(USERS.REPORTS.ALL(payload))
            ),
    },
    intervalReport: {
        all: (payload) =>
            swr(USERS.INTERVAL_REPORT.ALL(payload), () =>
                api.get(USERS.INTERVAL_REPORT.ALL(payload))
            ),
    },
    faults: {
        all: (payload) =>
            swr(USERS.FAULTS.ALL(payload), () =>
                api.get(USERS.FAULTS.ALL(payload))
            ),
    },
};
