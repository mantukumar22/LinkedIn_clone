// Steps for State Management
//     Submit Action
//     Handle action in its's reducer
//     Register here -> reducer

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer"

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})