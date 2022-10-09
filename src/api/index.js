import { USER } from "./endpoints";
import { api } from "./wrapper";

export const user = {
    login: (payload) => api.post(USER.LOGIN, payload),
    signup: (payload) => api.post(USER.LOGIN, payload)
}