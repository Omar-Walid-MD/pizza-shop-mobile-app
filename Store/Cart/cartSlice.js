import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'
import {auth, database} from "../../Firebase/firebase"
import { child, get, ref, remove, set } from 'firebase/database';

const initialState = {
    cart: [],
    cartItemToShow: null,
    loading: true,
}

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (args,{getState}) => {

        const userId = getState().auth.userId;
        console.log("getting cart for",userId);
        if(userId)
        {
            if(userId!=="anonymous")
            {
                let cart;
                await get(child(ref(database), `carts/${userId}`)).then((snapshot) => {
                    if(snapshot.exists())
                    {
                        cart = snapshot.val();
                    }
                });
                return Object.keys(cart || {}).map((itemId) => ({id:itemId,...cart[itemId]}));
            }
            else
            {
                let cart = JSON.parse(await AsyncStorage.getItem("userCart")) || [];
                console.log("anonymous cart worked");
                return cart;
            }
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (addedItem,{getState}) => {
    
        let cart = getState().cart.cart;
        cart = [...cart,addedItem];

        const userId = getState().auth.userId;
        if(userId)
        {
            if(userId!=="anonymous")
            {
                const itemWithoutId = JSON.parse(JSON.stringify(addedItem));
                delete itemWithoutId.id;
                set(ref(database,`carts/${userId}/${addedItem.id}`), itemWithoutId);
            }
            else
            {
                await AsyncStorage.setItem("userCart",JSON.stringify(cart));
            }
        }
        
        return cart;
        
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (item,{getState}) => {

        let cart = getState().cart.cart.filter((cartItem) => cartItem.id!==item.id || cartItem.size!==item.size);

        const userId = getState().auth.userId;
        if(userId)
        {
            if(userId!=="anonymous")
            {
                remove(ref(database,`carts/${userId}/${item.id}`));
            }
            else
            {
                await AsyncStorage.setItem("userCart",JSON.stringify(cart));
            }
        }
        
        return cart;
        
    }
);


export const setItemCount = createAsyncThunk(
    'cart/setItemCount',
    async (item, {getState}) => {

        let cart = getState().cart.cart.map((cartItem) => 
            (cartItem.id===item.id && cartItem.size===item.size) ? ({...cartItem,count:item.count}) : cartItem);

        const userId = getState().auth.userId;
        if(userId)
        {
            if(userId!=="anonymous")
            {
                set(ref(database,`carts/${userId}/${item.id}/count`),item.count);
            }
            else
            {
                await AsyncStorage.setItem("userCart",JSON.stringify(cart));
            }
        }

        return cart;
    }
);

export const emptyCart = createAsyncThunk(
    'cart/emptyCart',
    async (args, {getState}) => {

        const userId = getState().auth.userId;
        if(userId)
        {
            if(userId!=="anonymous")
            {
                remove(ref(database,`carts/${userId}`));
            }
            else
            {
                await AsyncStorage.setItem("userCart",JSON.stringify([]));
            }
        }
        return cart;
    }
);
    
export const setCartItemToShow = createAsyncThunk(
    'items/setCartItemToShow',
    (cartItem) => {return cartItem;}
); 

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getCart
        .addCase(getCart.pending,(state) => {
            state.loading = true
        })
        .addCase(getCart.fulfilled,(state, { payload }) => {
            state.loading = false
            state.cart = payload;
        })
        .addCase(getCart.rejected,(state) => {
            state.loading = false;
        })


        //addToCart
        .addCase(addToCart.pending,(state) => {
            state.loading = true
        })
        .addCase(addToCart.fulfilled,(state, { payload }) => {
            state.loading = false
            state.cart = payload;
            console.log("added item")
        })
        .addCase(addToCart.rejected,(state) => {
            state.loading = false;
        })
        

        //removeFromCart
        .addCase(removeFromCart.pending,(state) => {
            state.loading = true
        })
        .addCase(removeFromCart.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.cart = payload;
        })
        .addCase(removeFromCart.rejected,(state) => {
            state.loading = false;
        })

        //setCartItemToShow   
        .addCase(setCartItemToShow.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.cartItemToShow = payload;
        })

        //setItemCount
        .addCase(setItemCount.pending,(state) => {
            state.loading = true
        })
        .addCase(setItemCount.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.cart = payload;
        })
        .addCase(setItemCount.rejected,(state) => {
            state.loading = false;
        })
        
       //emptyCart
       .addCase(emptyCart.pending,(state) => {
        state.loading = true
        })
        .addCase(emptyCart.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.cart = payload;
        })
        .addCase(emptyCart.rejected,(state) => {
            state.loading = false;
        })
        
    },
});

export default cartSlice.reducer;