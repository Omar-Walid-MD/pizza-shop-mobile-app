import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'
import {auth, database} from "../../Firebase/firebase"
import { ref, remove, set } from 'firebase/database';

const initialState = {
    cart: [],
    cartItemToShow: null,
    loading: true,
}

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (args,{getState}) => {

        if(auth.currentUser)
        {
            const userCart = getState().auth.user.cart;
            return Object.keys(userCart || {}).map((itemId) => ({id:itemId,...userCart[itemId]}));
        }
        else
        {
            return JSON.parse(await AsyncStorage.getItem("userCart")  || []);
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (addedItem,{getState}) => {
    
        let cart = getState().cart.cart;
        cart = [...cart,addedItem];

        if(auth.currentUser)
        {
            const itemWithoutId = JSON.parse(JSON.stringify(addedItem));
            delete itemWithoutId.id;
            set(ref(database,`users/${auth.currentUser.uid}/cart/${addedItem.id}`), itemWithoutId);
        }
        else
        {
            await AsyncStorage.setItem("userCart",JSON.stringify(cart));
        }
        
        return cart;
        
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (item,{getState}) => {

        let cart = getState().cart.cart.filter((cartItem) => cartItem.id!==item.id || cartItem.size!==item.size);

        if(auth.currentUser)
        {
            remove(ref(database,`users/${auth.currentUser.uid}/cart/${item.id}`));
        }
        else
        {
            await AsyncStorage.setItem("userCart",JSON.stringify(cart));
        }
        
        return cart;
        
    }
);


export const setItemCount = createAsyncThunk(
    'cart/setItemCount',
    async (item, {getState}) => {
    
    

        let cart = getState().cart.cart.map((cartItem) => 
            (cartItem.id===item.id && cartItem.size===item.size) ? ({...cartItem,count:item.count}) : cartItem);

        if(auth.currentUser)
        {
            set(ref(database,`users/${auth.currentUser.uid}/cart/${item.id}/count`),item.count);
        }
        else
        {
            await AsyncStorage.setItem("userCart",JSON.stringify(cart));
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
        
      
    },
});

export default cartSlice.reducer;