import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth/signIn/signIn";

const combinedReducer = combineReducers({
  auth: authSliceReducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
  return combinedReducer(state, action);
};
