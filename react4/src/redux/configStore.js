import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from 'redux-thunk'
import LoadingReducer from "./reducers/LoadingReducer";
// middleware saga
import createMiddleWareSaga from 'redux-saga'
import { rootSage } from "./saga/rootSaga";
import { ModalReducer } from "./reducers/ModalReducer";


const middleWareSage = createMiddleWareSaga()



const rootReducer = combineReducers({
    // reducer khai báo tại đây
    ToDoListReducer,
    LoadingReducer,
    ModalReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSage));

middleWareSage.run(rootSage)


export default store;