const ACTIVE_ITEM = "ACTIVE_ITEM"
const GET_FAQ_GROUPS = "GET-API-GROUPS"
const GET_FAQ_ITEM = "GET-API-ITEM"
const MAKE_ACTIVE = "MAKE_ACTIVE"

interface ActiveItem {
    type: typeof ACTIVE_ITEM,
    payload: any
}
interface GetFaqItem {
    type: typeof GET_FAQ_ITEM,
    payload: Array<{
        id: number,
        Title: string,
        Answer: string,
        Active: boolean,
        Group: string
    }>
}
interface GetFaqGroups {
    type: typeof GET_FAQ_GROUPS,

        payload: Array<{
        id: number,
        Title: string

    }>
}
interface MakeActive {
    type: typeof MAKE_ACTIVE,
}
export type FaqActionTypes = ActiveItem | GetFaqItem | GetFaqGroups | MakeActive
