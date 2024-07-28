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
      
        let localCart = JSON.parse(AsyncStorage.getItem("userCart"));
    
        //   if(auth.currentUser)
        //   {
        //       const userCartObject = getState().auth.currentUser.cart || {};
        //       const userCart = getCartArray(userCartObject);
    
        //       return userCart;
        //   }
        if(false)
        {}
        else
        {
            if(localCart)
            {
                return localCart;
            }
            else
            {
                AsyncStorage.setItem("userCart",JSON.stringify([]))
                return [];
            }
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (productId, {getState}) => {
    
    
        if(false)
        {
            // let updatedCart = [...getState().cart.cart,{productId: productId, count: 1}];
    
            // set(ref(database, `users/${auth.currentUser.uid}/cart`), getCartObject(updatedCart));
            // return {product,cart:updatedCart};
        }
        else
        {
            let localCart = JSON.parse(AsyncStorage.getItem("userCart"))
            if(localCart)
            {
                localCart = [...localCart,{productId, count: 1}];
                AsyncStorage.setItem("userCart",JSON.stringify(localCart));
                return localCart;
            }
        }
    }
);
    

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, {getState}) => {
    
    
        if(auth.currentUser)
        {
            // let updatedCart = getState().cart.cart.filter((product) => product.productId !== productId);
    
            // set(ref(database, `users/${auth.currentUser.uid}/cart`), getCartObject(updatedCart));
            // return {product,cart:updatedCart};
        }
        else
        {
            let localCart = JSON.parse(localStorage.getItem("userCart"))
            if(localCart)
            {
                localCart = localCart.filter((product) => product.productId !== productId);
                localStorage.setItem("userCart",JSON.stringify(localCart));
                return localCart;
            }
        }
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
      
    },
});

export default cartSlice.reducer;