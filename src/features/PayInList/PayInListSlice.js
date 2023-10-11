import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PayInListService from "./PayInListService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  PayInLists: [],
};

const PayInListSlice = createSlice({
  name: "PayInLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPayInList.pending, (state) => {
        state.isLoading = true;     
      })
      .addCase(getPayInList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.PayInLists = action.payload.data;
      })
      .addCase(getPayInList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getPayInList = createAsyncThunk(
  "PayInLists/getAll",
  async (_, thunkAPI) => {
    try {
  
      return await PayInListService.getPayInList();
    } catch (error) {
      
      const message =
        (error.msg && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export default PayInListSlice.reducer;
