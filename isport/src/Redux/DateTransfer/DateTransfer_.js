import { createSlice } from '@reduxjs/toolkit';

const DateTransfer_ = createSlice({
  name: 'date',
  initialState: {
    data: [],
    clickedData: null, // State to store onClick data
  },
  reducers: {
    setClickedData(state, action) {
      state.clickedData = action.payload;
    },
    // console.log(object)
  },
});

export const { setClickedData } = DateTransfer_.actions;

export default DateTransfer_.reducer;
