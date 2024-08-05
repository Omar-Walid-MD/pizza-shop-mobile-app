import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage'
import { getCategorizedItems } from '../../TempData/menu';
import { child, get, ref } from 'firebase/database';
import { database } from '../../Firebase/firebase';

const initialState = {
    items: [],
    itemsCategorized: {},
    menuItemToShow: null,
    loading: true,
}

export const getItems = createAsyncThunk(
    'items/getItems',
    async () => {
        let items;
        await get(child(ref(database), `items`)).then((snapshot) => {
            if(snapshot.exists())
            {
                items = snapshot.val();
            }
        });
        return items;
    }
);

export const setMenuItemToShow = createAsyncThunk(
    'items/setMenuItemToShow',
    (menuItem) => {return menuItem;}
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

      
    },
});

export default itemsSlice.reducer;