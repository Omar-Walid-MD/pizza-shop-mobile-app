import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    "lang": null
}

export const getSettings = createAsyncThunk(
    'settings/getSettings',
    async () => {
        const settings = JSON.parse(await AsyncStorage.getItem("settings"));
        return settings;    
    }
);

export const setLanguage = createAsyncThunk(
    'settings/setLanguage',
    async ({lang},{getState}) => {
        let settings = getState().settings;
        await AsyncStorage.setItem("settings",JSON.stringify({...settings,lang}));
        return lang; 
    }
);

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSettings.fulfilled, (state, {payload}) => {
            state.lang = payload.lang;
        })

        .addCase(setLanguage.fulfilled, (state, {payload}) => {
            state.lang = payload;
            console.log(payload);
        })

       
      
    },
});

export default settingsSlice.reducer;