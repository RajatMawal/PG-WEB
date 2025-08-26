import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from "../redux/Slice/userSlice.js"
import propertySliceReducer from "../redux/Slice/propertySlice.js"
import otpSliceReducer from "../redux/Slice/otpSlicee.js"

export const store =configureStore({
    reducer:{
        user:userSliceReducer,
        property:propertySliceReducer,
        otp:otpSliceReducer
    }
})