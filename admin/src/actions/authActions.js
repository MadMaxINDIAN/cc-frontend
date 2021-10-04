import jwt from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { post } from "../utils/api";
import { GET_ERRORS, SET_ALERT, LOGOUT_USER, SET_CURRENT_USER } from "./type";

export const logoutAdmin = () => dispatch => {
    console.log("Admin logout");
    dispatch({
        type: LOGOUT_USER
    })
}

export const loginAdmin = (data, navigate) => async dispatch => {

    const res = await post("/admin/login", data, {})
    const {status} = res;

    if (status >= 400) {
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        })
        dispatch({
            type: SET_ALERT,
            payload: {
                type: "error",
                msg: res.data.message,
                key: Math.random()
            }
        })
        navigate("/login");
    } else {
        dispatch({
            type: SET_ALERT,
            payload: {
                type: "success",
                msg: res.data.message,
                key: Math.random()
            }
        })
        setAuthToken(res.data.token);
        const decoded = jwt(res.data.token);
        decoded.token = res.data.token
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
        navigate("/");
    }
}

export const resetAlert = () => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: {}
    })
}