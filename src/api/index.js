import { USER } from "./endpoints";
import { api } from "./wrapper";

export const user = {
    login: (username, password) => {
        const response = api.post(USER.LOGIN, {username: username, password: password})
    },
    signup: (payload) => {
        const response = api.post(USER.LOGIN, {username: username, password: password})
    }
}