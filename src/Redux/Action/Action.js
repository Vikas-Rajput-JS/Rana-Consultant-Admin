export const LOGIN_SUCCESS = (data)=>{
    return{
        type:"LOGIN_SUCCESS",
        payload:data
    }
}
export const LOGOUT_SUCCESS = ()=>{
    return{
        type:"LOGOUT_SUCCESS"
    }
}
export const SEARCH_STATE = (data)=>{
    return{
        type:"SEARCH_STATE",
        payload:data
    }
}
export const CHANGE_TABS = (data)=>{
    return{
        type:"CHANGE_TAB",
        payload:data
    }
}

