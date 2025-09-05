import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import searchReducer from './slices/searchSlice'
import reportReducer from './slices/reportSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    report: reportReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch