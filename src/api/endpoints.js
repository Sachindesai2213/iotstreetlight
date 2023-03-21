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
    DEVICES: {
        ALL: (user_id) => "/api/devices?user_id=" + user_id,
        CREATE: "/api/devices",
        PARAMETERS: {
            CREATE: "/api/device-parameters",
        },
        CONFIGURATIONS: {
            CREATE: "/api/device-configurations",
            PUSH: "/api/device-configurations",
        },
    },
    ACTIVITIES: {
        ALL: (user_id) => "/api/activities?user_id=" + user_id,
    },
    REPORTS: {
        ALL: ({ device_id, start_date, end_date }) =>
            "/api/reports?device_id=" +
            device_id +
            "&start_date=" +
            start_date +
            "&end_date=" +
            end_date,
    },
    HOURLY_REPORT: {
        ALL: ({ device_id, date, parameter_1, parameter_2, type }) =>
            "/api/hourly-report?device_id=" +
            device_id +
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
        ALL: ({ device_id, month, parameter_1, parameter_2, type }) =>
            "/api/daily-report?device_id=" +
            device_id +
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
        ALL: ({ device_id, year, parameter_1, parameter_2, type }) =>
            "/api/monthly-report?device_id=" +
            device_id +
            "&year=" +
            year +
            "&parameter_1=" +
            parameter_1 +
            "&parameter_2=" +
            parameter_2 +
            "&type=" +
            type,
    },
    FAULTS: {
        ALL: ({ user_id, start_date, end_date }) =>
            "/api/faults?user_id=" +
            user_id +
            "&start_date=" +
            start_date +
            "&end_date=" +
            end_date,
    },
};
