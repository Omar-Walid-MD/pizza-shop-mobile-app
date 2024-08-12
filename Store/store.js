import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/authSlice'
import cartReducer from './Cart/cartSlice'
import itemsReducer from './Items/itemsSlice'
import ordersReducer from './Orders/ordersSlice'
import settingsReducer from './Settings/settingsSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    items: itemsReducer,
    orders: ordersReducer,
    settings: settingsReducer
  },
})