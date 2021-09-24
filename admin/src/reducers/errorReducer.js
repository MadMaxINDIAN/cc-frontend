import {GET_ERRORS} from "../actions/type"
import isEmpty from "../utils/isEmpty";

const initialState ={}

export default function(state = initialState,action){
    switch (action.type){
        case GET_ERRORS : {
            if (typeof action.payload === "string") {
                return {unauthorized : "Unauthorized access denied"}
            }
            return action.payload;
    }
        default:
            return state;
    }
}