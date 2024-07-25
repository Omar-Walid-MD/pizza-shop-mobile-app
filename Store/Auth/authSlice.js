import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    user: null,
    loading: true,
}

export const setUser = createAsyncThunk(
    'auth/setUser',
    (user) => {
        return user;    
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(setUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;

            console.log(action.payload);
        })
      
    },
});

export default authSlice.reducer;