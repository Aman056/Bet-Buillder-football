
// import { MarketApi } from './MarketsAction';
import { LegsApi } from './LegsAction';
import { createSlice } from '@reduxjs/toolkit';

const LegsSlice = createSlice({
    name: 'legs',
    initialState: {
        data: [],
        status: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LegsApi.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(LegsApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.error = null; // Reset error on success
            })
            .addCase(LegsApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default LegsSlice.reducer;
