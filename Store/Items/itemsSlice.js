import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'
import { getCategorizedItems, items } from '../../TempData/menu';

const initialState = {
    items: [],
    itemsCategorized: {},
    menuItemToShow: null,
    loading: true,
}

export const getItems = createAsyncThunk(
    'items/getItems',
    () => {return items;}
);

export const setMenuItemToShow = createAsyncThunk(
    'items/setMenuItemToShow',
    (menuItem) => {return menuItem;}
);

export const setMenuItemOptions = createAsyncThunk(
    'items/setMenuItemOptions',
    (menuItemOptions) => {return menuItemOptions;}
);

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.itemsCategorized = getCategorizedItems(action.payload);
            state.loading = false;
        })

        .addCase(setMenuItemToShow.fulfilled, (state, action) => {
            state.menuItemToShow = action.payload;
            state.loading = false;
        })

        .addCase(setMenuItemOptions.fulfilled, (state, action) => {
            state.menuItemOptions = action.payload;
            state.loading = false;
        })
      
    },
});

export default itemsSlice.reducer;