import { SET_CURRENT_USER, SET_ALERT, LOGOUT_USER } from "../actions/type";
import isEmpty from "../utils/isEmpty";

const initialState ={
    isAuthenticated :false,
    user : {},
    alert: {}
}

export default function(state = initialState,action){
    switch (action.type){
        case SET_CURRENT_USER :
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user : action.payload
        }
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload,
            }
        case LOGOUT_USER:
        return {
            ...state,
            isAuthenticated: false,
            user: {},
            alert: {
                type: "success",
                msg: "Admin logged out",
                key: Math.random()
            }
        }
        default:
            return state;
    }
}