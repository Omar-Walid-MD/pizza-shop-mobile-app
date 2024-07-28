import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/authSlice'
import cartReducer from './Cart/cartSlice'
import itemsReducer from './Items/itemsSlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    items: itemsReducer
  },
})