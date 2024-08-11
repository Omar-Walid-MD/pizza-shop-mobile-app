import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'
import { auth } from '../../Firebase/firebase';

const initialState = {
    user: null,
    userId: null,

    loading: true,
    userIdLoading: true,
}

export const setUser = createAsyncThunk(
    'auth/setUser',
    async (user) => {
        if(user?.userId) await AsyncStorage.setItem("userId",user.userId);
        return user;    
    }
);

export const getLoggedInUserId = createAsyncThunk(
    'auth/getLoggedInUserId',
    async () => {
        // await AsyncStorage.removeItem("userId");
        return await AsyncStorage.getItem("userId") || "anonymous";    
    }
);

export const signOut = createAsyncThunk(
    'auth/signOut',
    async () => {
        auth.signOut()
        await AsyncStorage.setItem("userId","anonymous");
        return null;
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
            state.userId = action.payload?.userId || "anonymous";
            state.loading = false;
        })

        .addCase(getLoggedInUserId.fulfilled, (state, action) => {
            state.userId = action.payload;
            state.userIdLoading = false;
        })

        .addCase(signOut.fulfilled, (state, action) => {
            state.user = null;
            state.userId = "anonymous";
        })
      
    },
});

export default authSlice.reducer;