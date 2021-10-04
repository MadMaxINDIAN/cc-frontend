import { post, get } from "../utils/api";
import { GET_ERRORS, SET_ALERT } from "./type";

export const newBlogPost = (productData, navigate) => async dispatch => {

    const res = await post("/blog/new", productData, {})
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
        navigate("/");
    }
}

export const getTags = (tags) => async dispatch => {

    const res = await get("/blog/tags", {});
    const {status} = res;

    if (status >= 400) {
        dispatch({
            type: SET_ALERT,
            payload: {
                type: "error",
                msg: "Unable to get blog tags",
                key: Math.random()
            }
        })
    } else {
        tags.current = res.data.tags;
    }
} 