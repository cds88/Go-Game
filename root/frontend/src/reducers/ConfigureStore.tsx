
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
 
import { InterfaceReducer } from './reducer_userinterface/UserInterfaceReducer';
import { AllAppActions } from "./actions/AllActionsTypes";

export const rootReducer = combineReducers({
      InterfaceReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AllAppActions>)
);


