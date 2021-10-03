import {createStore , applyMiddleware , compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import StateLoader from "./utils/StateLoader";

const stateLoader = new StateLoader();
const initialState = stateLoader.loadState();

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

store.subscribe(() => {
    // this is just a function that saves state to localStorage
    stateLoader.saveState(store.getState());
}); 

export default store;