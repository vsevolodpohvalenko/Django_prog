import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux_store";
import {faqAPI} from "../../api/FaqApi";
import Group from "react-select/src/components/Group";

const ACTIVE_ITEM = "ACTIVE_ITEM"
const GET_FAQ_GROUPS = "GET-API-GROUPS"
const GET_FAQ_ITEM = "GET-API-ITEM"
const MAKE_ACTIVE = "MAKE_ACTIVE"

type initialState = {
    groups: Array<string | number>,
    items: Array<any>
    active_item: any
}
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, FaqActionTypes>
let initialState: initialState = {
    groups: [],
    items: [],
    active_item: null
}

export const FAQReducer = (state = initialState, action: FaqActionTypes) => {
    switch (action.type) {
        case GET_FAQ_GROUPS:
            return {...state, groups: action.payload}
        case ACTIVE_ITEM:
            return {...state, active_item: action.payload}
        case GET_FAQ_ITEM:
            return {...state, items: action.payload}
        case MAKE_ACTIVE:
            return {...state, active_item: {...state.active_item, Active: !state.active_item.Active}}
        default:
            return state
    }
}

export type FaqActionTypes = InferActionsTypes<typeof actions>
const actions: { [key: string]: (...args: any) => any; } = {
getFaqGroupsSuccess : (payload: Array<{Title: string, id: number}>): FaqActionTypes => ({type: GET_FAQ_GROUPS, payload}),
getFaqItemsSuccess : (payload: Array<{
        id: number,
        Title: string,
        Answer: string,
        Active: boolean,
        Group: string
}>): FaqActionTypes => ({type: GET_FAQ_ITEM, payload}),
activeIdSuccess : (item: {
        id: number,
        Title: string
}): FaqActionTypes => ({type: ACTIVE_ITEM, payload: item})}

export const getFaqGroups = ():ThunkType => async (dispatch) => {
    let response = await faqAPI.getFaq_Group()
    debugger
    dispatch(actions.getFaqGroupsSuccess(response.data))
}
export const ActiveId = (item: any):ThunkType  => async (dispatch) => {
    debugger
    await  faqAPI.active_Item(item)
    faqAPI.getFaq_Item()
    dispatch(actions.activeIdSuccess(item))
    dispatch({type: MAKE_ACTIVE})
}

export const getFaqItems = ():ThunkType => async (dispatch) => {
    let response = await faqAPI.getFaq_Item()
    dispatch(actions.getFaqItemsSuccess(response.data))
}
