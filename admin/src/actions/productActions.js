import { post } from "../utils/api";
import { GET_ERRORS, SET_ALERT } from "./type";

export const newProduct = (productData, history) => async dispatch => {

    const res = await post("/auth/products/new", productData, {})
    const {status} = res;

    if (status >= 400) {
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        })
    } else {
        dispatch({
            type: SET_ALERT,
            payload: {
                type: "success",
                msg: res.data.message,
                key: Math.random()
            }
        })
    }
}