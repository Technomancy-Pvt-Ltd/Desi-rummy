import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PayoutListService from "./PayoutListService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  PayoutLists: [],
  status:null
};

const PayoutListSlice = createSlice({
  name: "PayoutLists",
  initialState,
  reducers: {
    Payoutreset: (state) => { state = initialState},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayoutList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayoutList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.PayoutLists = action.payload.data;
        state.status = action.payload.success;
        state.message=action.payload.message
      })
      .addCase(getPayoutList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getPayoutList = createAsyncThunk(
  "PayoutLists/getAll",
  async (_, thunkAPI) => {
    try {

      return await PayoutListService.getPayoutList();
    } catch (error) {
      const message =
        (error.msg && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const { Payoutreset } = PayoutListSlice.actions;

export default PayoutListSlice.reducer;
