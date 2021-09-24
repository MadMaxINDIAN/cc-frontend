import {GET_ERRORS , GET_PRODUCT , PRODUCT_LOADING} from './type';
import axios from "axios";

// adding product
export const addProduct = (productData,history) => dispatch => {
    axios.post("/api/product/details", productData)
    .then(res => 
        {history.push("/manager/dashboard")
        // dispatch({
        //     type : SET_PRODUCT_PROGRESS,
        //     payload : {...res}
        // })
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    )
}

// Displaying product
export const getCurrentProduct = (productID) => dispatch => {
    dispatch(setProductLoading())
    axios.get("/api/product/" + productID)
        .then(res => {
            dispatch({
                type : GET_PRODUCT,
                payload : res.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type : GET_ERRORS,
                payload : err
            });
        })
}

// Product Loading
export const setProductLoading = () => {
    return {
        type : PRODUCT_LOADING
    }
}

// Add Review
export const addReview = (productID,reviewData,history) => dispatch => {
    axios.post("/api/product/" + productID + "/review", reviewData)
    .then(res => 
        {history.push("/")
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    )
}
