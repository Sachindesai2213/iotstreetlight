export const USER = {
    LOGIN: "/api/login/",
    SIGNUP: "/api/signup/",
    METERS: {
        ALL: (user_id) => "/api/meters/?user_id=" + user_id,
        CREATE: "/api/meters/",
    }
}