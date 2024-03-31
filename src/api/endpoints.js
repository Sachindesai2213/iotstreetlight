export const USERS = {
    LOGIN: "/api/token",
    SIGNUP: "/api/signup",
    PROFILE: {
        GET: () => "/api/profile",
        UPDATE: "/api/profile",
    },
    DASHBOARD_DATA: {
        GET: () => "/api/dashboard-data",
    },
    DEVICES: {
        ALL: () => "/api/devices",
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
        ALL: () => "/api/activities",
    },
    REPORTS: {
        ALL: ({ device_id, start_date, end_date }) =>
            `/api/reports?${device_id ? `device_id=${device_id}` : ""}&start_date=${start_date}&end_date=${end_date}`,
    },
    INTERVAL_REPORT: {
        ALL: ({ device_id, date, month, year, parameter_1, parameter_2, type, interval }) =>
            "/api/interval-report?device_id=" +
            device_id +
            "&date=" +
            date +
            "&month=" +
            month +
            "&year=" +
            year +
            "&parameter_1=" +
            parameter_1 +
            "&parameter_2=" +
            (parameter_2 || "") +
            "&type=" +
            type +
            "&interval=" +
            interval,
    },
    FAULTS: {
        ALL: ({ start_date, end_date }) =>
            "/api/faults?start_date=" +
            start_date +
            "&end_date=" +
            end_date,
    },
};
