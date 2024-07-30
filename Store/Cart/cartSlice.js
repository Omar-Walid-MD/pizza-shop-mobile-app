import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'


const initialState = {
    cart: [],
    cartItemToShow: null,
    loading: true,
}

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (args,{getState}) => {

        let localCart = JSON.parse(await AsyncStorage.getItem("userCart")  || []);
        console.log("getting cart");
        
        return localCart;
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (addedItem,{getState}) => {
    
        let localCart = getState().cart.cart;
        localCart = [...localCart,addedItem];
        
        await AsyncStorage.setItem("userCart",JSON.stringify(localCart));
        return localCart;
        
    }
);

export const setItemCount = createAsyncThunk(
    'cart/setItemCount',
    async (item,{getState}) => {
    
        let localCart = getState().cart.cart;
        console.log(item);

        localCart = localCart.map((cartItem) => 
        (cartItem.id===item.id && cartItem.size===item.size) ? ({...cartItem,count:item.count}) : cartItem);

        console.log(localCart);

        await AsyncStorage.setItem("userCart",JSON.stringify(localCart));
        return localCart;
        
    }
);


export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (item, {getState}) => {
    
        let localCart = getState().cart.cart;
        localCart = localCart.filter((cartItem) => cartItem.id!==item.id || cartItem.size!==item.size);

        await AsyncStorage.setItem("userCart",JSON.stringify(localCart));
        return localCart;
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