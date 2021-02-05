import {instance} from "./profileApi";
import {config} from "../api";

export const authAPI = {
    getUser: (tokenConfig: any) => {

        return instance.get<{
            first_name: string,
            id: number,
            email: string
        }>('auth/users/me/', tokenConfig)
    },
    login: (body: any, csrf_token: string) => {

        return instance.post('auth/token/login', body, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token,

            }})
    },
    logout: (tokenConfig: any) => {

        return instance.post('auth/token/logout', "", tokenConfig)
    },
    register: (body: any, csrf_token: string) => {
        debugger
        return instance.post('auth/users/', body, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token,

            }})
    },
    forgot_password: (body: any) => {

        return instance.post('auth/users/reset_password/', body)
    },
    reset_password: (body: any) => {

        return instance.post('auth/users/reset_password_confirm/', body)
    },
    activate: (body: any, csrftoken:string) => {
        debugger
        return instance.post('auth/users/activation/', {
            uid: body.uid,
            token: body.token
        },{
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,

            }})
    },
}