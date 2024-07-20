import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    loading: true,
}

export const getAmogusName = createAsyncThunk(
    'playerData/getAmogusName',
    async () => {
     
});

export const playerDataSlice = createSlice({
    name: "playerData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // builder
      // .addCase(getAmogusName, (state, action) => {

      // })
      
    },
});

export default playerDataSlice.reducer;