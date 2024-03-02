import { BetBuilder } from './BetBuilderBetsAction';
import { createSlice } from '@reduxjs/toolkit';

const BetBuilderSlice = createSlice({
    name: 'legs',
    initialState: {
        data: [],
        status: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(BetBuilder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(BetBuilder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.error = null; // Reset error on success
            })
            .addCase(BetBuilder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default BetBuilderSlice.reducer;
