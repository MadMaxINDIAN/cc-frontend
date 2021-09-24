import { post } from "../utils/api";
import { GET_ERRORS } from "./type";

export const newProduct = (productData) => async dispatch => {

    const res = await post("/auth/products/new", productData, {})
    const {status} = res;

    if (status >= 400) {
        console.log(res);
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        })
    }
}