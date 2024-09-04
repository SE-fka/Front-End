import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import InvestigationSlice from "./InvestigationSlice";
import createSagaMiddleware from '@redux-saga/core';
import TargetAnalysisSlice from "./TargetAnalysisSlice";

import userReducer from '../../features/userSlice'

const rootReducer = combineReducers({
    auth: AuthSlice,
    investigation: InvestigationSlice,
    targetAnalysis: TargetAnalysisSlice,

      
    /* This for Facebook user and page store */
    user: userReducer,


})

export const saga = createSagaMiddleware()
export const store = configureStore({
    reducer: rootReducer,
    middleware: [saga]
})
