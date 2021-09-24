import { ADD_PRODUCT_TO_CART, GET_ERRORS} from './type';
import axios from "axios";
import isEmpty from "./../utils/isEmpty";

// ADD PRODUCT TO THE CART
export const addProductToCart = (productID,auth,cart,token) => dispatch => {
    if (auth.isAuthenticated === true && isEmpty(token) === false){
        axios.get("/api/users/cart")
            .then( res => {
                const errors = {}
                var { cart } = res.data;
                    const product = {
                        productID : productID
                    }
                    var i;
                    for (i = 0;i < cart.products.length;i++){
                        if (cart.products[i].productID == productID){
                            break;
                        }
                    }
                    if (i < cart.products.length){
                        errors.productInCart = "Product is already in cart";
                        dispatch({
                            type : GET_ERRORS,
                            payload : errors
                        })
                    } else {
                        cart.products.unshift(product)
                axios.post("/api/users/cart/edit",cart)
                    .then(res => {
                        console.log(res.data);
                        dispatch({
                            type : ADD_PRODUCT_TO_CART,
                            payload : res.data
                        });
                    })
                    .catch(err => 
                        dispatch({
                            type : GET_ERRORS,
                            payload : err.response.data
                        })
                    );
                    }
            })
            .catch(err => {
                console.log(err);
            }
            );
        
    }
    else {
        const errors = {}
        const product = {
            productID : productID
        }
        if (localStorage.userCart){
            cart = JSON.parse(localStorage.userCart);
        }
        var i;
        for (i = 0;i < cart.products.length;i++){
            if (cart.products[i].productID == productID){
                break;
                }
            }
        if (i < cart.products.length){
            errors.productInCart = "Product is already in cart";
            dispatch({
                type : GET_ERRORS,
                payload : errors
            })
        } else {
            cart.products.unshift(product);
        dispatch({
            type : ADD_PRODUCT_TO_CART,
            payload : cart.products
        })
        errors.productaddedtocart = "Product added to cart";
        dispatch({
            type : GET_ERRORS,
            payload : errors
        })
        const stringCart = JSON.stringify(cart);
        localStorage.setItem("userCart",stringCart);
        }
    }
}

export const productDetails = (cart) => dispatch => {
    const errors = {}
    if (!isEmpty(cart.products[0])){
        const products = []
        var i = 0;
        for (i=0 ; i < cart.products.length ; i++){
            products.unshift(cart.products[i].productID)
        }
        console.log(products);
        axios.post("/api/users/cart/productdetails", {products : products})
            .then(res => {console.log(res)})
            .catch (err => {console.log(err)})
    } else {
        errors.noproduct = "Cart is empty";
            dispatch({
                type : GET_ERRORS,
                payload : errors
            })
    }
}
