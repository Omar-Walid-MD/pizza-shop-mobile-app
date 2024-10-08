import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'
import {auth, database} from "../../Firebase/firebase"
import { child, get, ref, remove, set, update } from 'firebase/database';
import uuid from "react-native-uuid";

const initialState = {
    orders: {},
    currentOrderID: null,
    loading: true,
}

export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async (args,{getState}) => {

        const userId = getState().auth.userId;
        if(userId)
        {
            if(userId!=="anonymous")
            {
                let orders;
                await get(child(ref(database), `orders/${auth.currentUser.uid}`)).then((snapshot) => {
                    if(snapshot.exists())
                    {
                        orders = snapshot.val();
                    }
                });
                Object.keys(orders).forEach(async (orderID)=>{
                    if(orders[orderID].orderStatus==="pending" && Date.now() >= orders[orderID].date + 2 * 3600 * 1000)
                    {
                        orders[orderID].orderStatus = "success";
                        orders[orderID].deliveryStatus = "delivered";
                        await update(ref(database, `orders/${auth.currentUser.uid}/${orderID}`),orders[orderID]);
                    }
                });
                return orders;
    
            }
            else
            {
                return JSON.parse(await AsyncStorage.getItem("userOrders")) || {};
            }
        }
    }
);

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async (order) => {

        
        const userId = getState().auth.userId;
        if(userId)
        {
            let orderID = uuid.v4();
            if(userId!=="anonymous")
            {
                await set(ref(database, `orders/${userId}/${orderID}`),order);
            }
            else
            {
                const orders = getState().orders.orders;
                orders[orderID] = order;
                await AsyncStorage.setItem("userOrders",JSON.stringify(orders));
            }
            return {order,orderID};
        }

    }
);

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        //getOrders
        .addCase(getOrders.pending,(state) => {
            state.loading = true
        })
        .addCase(getOrders.fulfilled,(state, { payload }) => {
            state.loading = false
            state.orders = payload;
            Object.keys(payload).forEach((orderKey)=>{
                if(payload[orderKey].orderStatus==="pending")
                {
                    state.currentOrderID = orderKey;
                    return;
                }
            })
            
        })
        .addCase(getOrders.rejected,(state) => {
            state.loading = false;
        })


        //addOrder
        .addCase(addOrder.pending,(state) => {
            state.loading = true
        })
        .addCase(addOrder.fulfilled,(state, { payload }) => {
            console.log("added order")
            state.loading = false
            state.currentOrderID = payload.orderID;
            state.orders[payload.orderID] = payload.order;
        })
        .addCase(addOrder.rejected,(state) => {
            console.log("rejected")
            state.loading = false;
        })

      
    },
});

export default ordersSlice.reducer;