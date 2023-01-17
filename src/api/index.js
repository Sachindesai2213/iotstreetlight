import useSWR from "swr";
import { USERS } from "./endpoints";
import { api } from "./wrapper";

function swr(variable, fxn) {
    const response = useSWR(variable, fxn);
    return response.data;
}

export const user = {
    login: (payload) => api.post(USERS.LOGIN, payload),
    signup: (payload) => api.post(USERS.SIGNUP, payload),
    profile: {
        get: (user_id) =>
            swr(USERS.PROFILE.GET(user_id), () =>
                api.get(USERS.PROFILE.GET(user_id))
            ),
        update: (payload) => api.post(USERS.PROFILE.UPDATE, payload),
    },
    dashboardData: {
        get: (user_id) =>
            swr(USERS.DASHBOARD_DATA.GET(user_id), () =>
                api.get(USERS.DASHBOARD_DATA.GET(user_id))
            ),
    },
    meters: {
        all: (user_id) =>
            swr(USERS.METERS.ALL(user_id), () =>
                api.get(USERS.METERS.ALL(user_id))
            ),
        create: (payload) => api.post(USERS.METERS.CREATE, payload),

        parameters: {
            create: (payload) =>
                api.post(USERS.METERS.PARAMETERS.CREATE, payload),
        },
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
    hourlyReport: {
        all: (payload) =>
            swr(USERS.HOURLY_REPORT.ALL(payload), () =>
                api.get(USERS.HOURLY_REPORT.ALL(payload))
            ),
    },
    dailyReport: {
        all: (payload) =>
            swr(USERS.DAILY_REPORT.ALL(payload), () =>
                api.get(USERS.DAILY_REPORT.ALL(payload))
            ),
    },
    monthlyReport: {
        all: (payload) =>
            swr(USERS.MONTHLY_REPORT.ALL(payload), () =>
                api.get(USERS.MONTHLY_REPORT.ALL(payload))
            ),
    },
    faults: {
        all: (payload) =>
            swr(USERS.FAULTS.ALL(payload), () =>
                api.get(USERS.FAULTS.ALL(payload))
            ),
    },
};
