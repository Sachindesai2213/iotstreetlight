export const USERS = {
    LOGIN: "/api/login",
    SIGNUP: "/api/signup",
    METERS: {
        ALL: (user_id) => "/api/meters?user_id=" + user_id,
        CREATE: "/api/meters",
        
        PARAMETERS: {
            CREATE: "/api/meter-parameters"
        }
    },
    ACTIVITIES: {
        ALL: (user_id) => "/api/activities?user_id=" + user_id,
    },
    REPORTS: {
        ALL: ({user_id, start_date, end_date}) => "/api/reports?user_id=" + user_id + "&start_date=" + start_date + "&end_date=" + end_date,
    },
    HOURLY_REPORT: {
        ALL: ({user_id, date, parameter}) => "/api/hourly-report?user_id=" + user_id + "&date=" + date + "&parameter=" + parameter,
    },
    DAILY_REPORT: {
        ALL: ({user_id, month, parameter}) => "/api/daily-report?user_id=" + user_id + "&month=" + month + "&parameter=" + parameter,
    },
    MONTHLY_REPORT: {
        ALL: ({user_id, year, parameter}) => "/api/monthly-report?user_id=" + user_id + "&year=" + year + "&parameter=" + parameter,
    }
}