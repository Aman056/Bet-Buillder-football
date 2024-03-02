
import { GetFixtureData } from './GetFixturesAction';
import { createSlice } from '@reduxjs/toolkit';

const GetFixturesSlice = createSlice({
    name: 'fixture',
    initialState: {
        data: [],
        status: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetFixtureData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(GetFixtureData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.error = null; // Reset error on success
            })
            .addCase(GetFixtureData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default GetFixturesSlice.reducer;
