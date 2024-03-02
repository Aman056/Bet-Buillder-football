
import { MarketApi } from './MarketsAction';
import { createSlice } from '@reduxjs/toolkit';

const MarketSlice = createSlice({
    name: 'market',
    initialState: {
        data: [],
        status: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(MarketApi.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(MarketApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.error = null; // Reset error on success
            })
            .addCase(MarketApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default MarketSlice.reducer;
