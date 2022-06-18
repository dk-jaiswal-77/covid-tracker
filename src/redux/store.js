import { createStore, combineReducers, compose, applyMiddleware } from "redux";

// importing reducers
import updateDataReducer from "./updateData/reducer";

const rootReducer = combineReducers({
    data : updateDataReducer
});

const thunk_middleware = (store) => (next) => (action) => {
    if(typeof(action) === "function")
    {
        return action(store.dispatch);
    }
    next(action);
}


export const store = createStore(rootReducer, compose(applyMiddleware(thunk_middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

