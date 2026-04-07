import { configureStore } from '@reduxjs/toolkit'
import sellerAuthReducer from './sellerAuthSlice'

export const sellerStore = configureStore({
  reducer: {
    sellerAuth: sellerAuthReducer,
  },
})