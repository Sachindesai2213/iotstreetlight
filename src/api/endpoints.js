export const USERS = {
    LOGIN: "/api/login",
    SIGNUP: "/api/signup",
    PROFILE: {
        GET: (user_id) => "/api/profile?user_id=" + user_id,
        UPDATE: "/api/profile",
    },
    DASHBOARD_DATA: {
        GET: (user_id) => "/api/dashboard-data?user_id=" + user_id,
    },
    METERS: {
        ALL: (user_id) => "/api/meters?user_id=" + user_id,
        CREATE: "/api/meters",

        PARAMETERS: {
            CREATE: "/api/meter-parameters",
        },
    },
    ACTIVITIES: {
        ALL: (user_id) => "/api/activities?user_id=" + user_id,
    },
    REPORTS: {
        ALL: ({ user_id, start_date, end_date }) =>
            "/api/reports?user_id=" +
            user_id +
            "&start_date=" +
            start_date +
            "&end_date=" +
            end_date,
    },
    HOURLY_REPORT: {
        ALL: ({ user_id, date, parameter_1, parameter_2, type }) =>
            "/api/hourly-report?user_id=" +
            user_id +
            "&date=" +
            date +
            "&parameter_1=" +
            parameter_1 +
            "&parameter_2=" +
            parameter_2 +
            "&type=" +
            type,
    },
    DAILY_REPORT: {
        ALL: ({ user_id, month, parameter_1, parameter_2, type }) =>
            "/api/daily-report?user_id=" +
            user_id +
            "&month=" +
            month +
            "&parameter_1=" +
            parameter_1 +
            "&parameter_2=" +
            parameter_2 +
            "&type=" +
            type,
    },
    MONTHLY_REPORT: {
        ALL: ({ user_id, year, parameter_1, parameter_2, type }) =>
            "/api/monthly-report?user_id=" +
            user_id +
            "&year=" +
            year +
            "&parameter_1=" +
            parameter_1 +
            "&parameter_2=" +
            parameter_2 +
            "&type=" +
            type,
    },
};
