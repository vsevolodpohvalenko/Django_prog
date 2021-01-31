import {GET_ERRORS} from './ErrorsReducer'
import {CREATE_MESSAGE, createMessage} from "./MessageReducer";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "../redux_store";
import {ThunkAction} from "redux-thunk";
import {profileAPI} from "../../api/profileApi";
import {authAPI} from "../../api/AuthApi";

export type GetStateType = () => AppStateType

const USER_LOADING = 'USER_LOADING'
const USER_LOADED = 'USER_LOADED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ACTIVATE_USER = 'ACTIVATE_USER'

export type initialStateTypes = {
    auth_token: any ,
    isAuthenticated: boolean | null,
    isLoading: boolean | null,
    activated: number | null,
    user: { email: string,
    first_name: string,
    id: number }}

export let initialState : initialStateTypes = {
    auth_token: localStorage.getItem('auth_token'),
    isAuthenticated: null,
    isLoading: false,
    activated: 0,
    user: JSON.parse(localStorage.getItem('user') as string),

}

export const AuthReducer = (state = initialState, action: AuthActionTypes): initialStateTypes => {

    switch (action.type) {
        case ACTIVATE_USER:
            return {...state, activated: action.payload}
        case USER_LOADING :
            return {...state, isLoading: !state.isLoading}
        case USER_LOADED:
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {...state, isAuthenticated: true, isLoading: false, user: action.payload}
        case LOGIN_SUCCESS:
            if (action.payload.auth_token != null) {
                localStorage.setItem('auth_token', action.payload.auth_token)
            }
            return {
                ...state, ...action.payload, isAuthenticated: true, isLoading: false
            }
        case REGISTER_SUCCESS:
            return {...state, auth_token:null, user:action.payload, isLoading: false}
        case LOGOUT_SUCCESS:
            debugger
            localStorage.removeItem('auth_token');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {...state, auth_token: null, user: {email: 'none@gmail.com', id: 0, first_name: 'none'}, isAuthenticated: false, isLoading: false}
        default:
            return state
    }
}
export type AuthActionTypes = InferActionsTypes<typeof actions>
export const actions: { [key: string]: (...args: any) => any; } = {
    loadUserSuccess: (): AuthActionTypes => ({type: USER_LOADING}),
    loginSuccess: (payload: { auth_token: any }): AuthActionTypes => ({type: LOGIN_SUCCESS, payload}),
    getUserSuccess: (payload: { first_name: string, id: number, email: string }): AuthActionTypes => ({type: USER_LOADED, payload}),
    logoutSuccess: (): AuthActionTypes => ({type: LOGOUT_SUCCESS}),
    registerSuccess: (user: any): AuthActionTypes => ({type: REGISTER_SUCCESS, payload: user}),
    activatedSuccessful: (payload: any): AuthActionTypes => ({type: ACTIVATE_USER, payload}),
}




export const loadUser = () => async (dispatch: Dispatch<AuthActionTypes>, getState: () => AppStateType) => {
    debugger
    dispatch(actions.loadUserSuccess());

    const response = await authAPI.getUser(tokenConfig(getState))
    dispatch(actions.getUserSuccess(response.data));
}

export const Logout = () =>  async (dispatch: Dispatch<AuthActionTypes>, getState: () => AppStateType) => {
    dispatch(actions.loadUserSuccess())
    await authAPI.logout(tokenConfig(getState)).then(() =>dispatch(actions.logoutSuccess()))
    dispatch(actions.loadUserSuccess())
    }


export const login = (email: string, password: string, csrftoken: string) => {
    return async (dispatch: Dispatch<any>, getState: GetStateType) => {

        const body = JSON.stringify({email, password})
        try {
            dispatch(actions.loadUserSuccess());
            let response: any = await authAPI.login(body, csrftoken)
            dispatch(actions.loginSuccess(response.data))
            dispatch(createMessage({log_in_ed: "Logged successful"}))
            const res = await authAPI.getUser(tokenConfig(getState))
            dispatch(actions.getUserSuccess(res.data));


        } catch (err) {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })


        }
        dispatch(actions.loadUserSuccess)
    };
}

export const register = (dataR: {csrf_token: string, email: string, first_name: string, last_name: string, password: string }): ThunkAction<Promise<void>, AppStateType, any, AuthActionTypes> => async (dispatch) => {

    const body = JSON.stringify({email: dataR.email, first_name: dataR.first_name, last_name: dataR.last_name, password: dataR.password})
    try {

        dispatch(actions.loadUserSuccess());
        const response = await authAPI.register(body, dataR.csrf_token)
        dispatch(actions.registerSuccess(response.data))
        dispatch({
            type: CREATE_MESSAGE,
            payload: {registered: "Check your email!"}
        })
        // await profileAPI.PostProfile(response.data.id)
        // await profileAPI.PostDocuments(response.data.id)
        dispatch(actions.loadUserSuccess)
    } catch (err) {
        const error = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            payload: error,
            type: GET_ERRORS
        })
    }
    dispatch(actions.loadUserSuccess)
}
export const ActivateUser = (body: any, csrftoken: string): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionTypes> => async (dispatch, getState) => {
    debugger
    const body1 = {
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password')}
    try {
        const  response1 = await authAPI.activate(body)
        dispatch(actions.activatedSuccessful(response1.data))
        dispatch(actions.loadUserSuccess());
        debugger
        let response = await authAPI.login(body1, csrftoken)
        debugger
        dispatch(actions.loginSuccess(response.data))
        dispatch({
            type: CREATE_MESSAGE,
            payload: {log_in_ed: "Logged successful"}})
        const res = await authAPI.getUser(tokenConfig(getState))
        dispatch(actions.getUserSuccess(res.data));


    } catch (err) {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })


    }
}

export const tokenConfig = (getState: GetStateType) => {
    debugger
    const auth_token = getState().auth.auth_token;

    const config: any = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (auth_token) {
        config.headers['Authorization'] = `Token ${auth_token}`;
    }


    return config
}