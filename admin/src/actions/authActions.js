import {GET_ERRORS,SET_CURRENT_USER,SET_CURRENT_ADMIN,SET_CURRENT_MANAGER, ADD_PRODUCT_TO_CART} from './type';
import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData,history) => dispatch => {
    axios.post("/api/users/register",userData)
    .then(res => history.push("/login"))
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}
// Login - Get user Token
export const loginUser = userData => dispatch => {
    axios.post("/api/users/login",userData)
    .then(res => {
        // Save to LocalStorage
        const { token } = res.data;
        // Set Token to localstorage
        localStorage.setItem("jwtToken",token);
        // Set token to auth header
        setAuthToken(token);
        // Decode Token
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded))
        // setting up the cart for user
        axios.get("/api/users/cart")
            .then( res => {
                dispatch({
                    type : ADD_PRODUCT_TO_CART,
                    payload : res.data.cart
                })
            })
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}

// Set Logged in user
export const uploadUserImage = ImageData => dispatch => {
    axios.post("/api/users/userimage",ImageData)
    .then(res => {
        dispatch(setCurrentUser(res.data))
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}

// Set Logged in user
export const setCurrentUser = decoded => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}

// Log out user
export const logoutUser = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem("jwtToken");
    // Remove auth header
    setAuthToken(false);
    // Delete the current user
    dispatch(setCurrentUser({}));
}
// Register Admin
export const registerAdmin = (userData,history) => dispatch => {
    axios.post("/api/admin/register",userData)
    .then(res => history.push("/admin/dashboard"))
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}

// Login - Get user Token
export const loginAdmin = userData => dispatch => {
    axios.post("/api/admin/login",userData)
    .then(res => {
        // Save to LocalStorage
        const { token } = res.data;
        // Set Token to localstorage
        localStorage.setItem("adminJwtToken",token);
        // Set token to auth header
        setAuthToken(token);
        console.log(token);
        // Decode Token
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentAdmin(decoded))
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}

// Set Logged in Admin
export const setCurrentAdmin = decoded => {
    return {
        type : SET_CURRENT_ADMIN,
        payload : decoded
    }
}

// Log out Admin
export const logoutAdmin = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem("adminJwtToken");
    // Remove auth header
    setAuthToken(false);
    // Delete the current user
    dispatch(setCurrentAdmin({}));
}

// Register Manager
export const registerManager = (userData,history) => dispatch => {
    axios.post("/api/manager/register",userData)
    .then(res => history.push("/manager/dashboard"))
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}

// Login - Get user Token
export const loginManager = userData => dispatch => {
    axios.post("/api/manager/login",userData)
    .then(res => {
        // Save to LocalStorage
        const { token } = res.data;
        // Set Token to localstorage
        localStorage.setItem("managerJwtToken",token);
        // Set token to auth header
        setAuthToken(token);
        console.log(token);
        // Decode Token
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentManager(decoded))
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}

// Set Logged in Admin
export const setCurrentManager = decoded => {
    return {
        type : SET_CURRENT_MANAGER,
        payload : decoded
    }
}

// Log out Admin
export const logoutManager = () => dispatch => {
    // Remove token from localstorage
    localStorage.removeItem("managerJwtToken");
    // Remove auth header
    setAuthToken(false);
    // Delete the current user
    dispatch(setCurrentManager({}));
}