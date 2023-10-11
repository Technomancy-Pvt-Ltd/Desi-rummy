import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SettelWithdrawRequestService } from "./SettelWithdrawService";

const initialState = {
  SettelWithdrawRequestData: [],
  SetteisLoading: false,
  isError: false,
  isSuccess: false,
  Settelmessage: "",
  Success: null,
};

export const SettelWithdrawRequest = createAsyncThunk(
  "Post/SettelWithdrawRequest",
  async (Data, thunkAPI) => {
    try {
      return await SettelWithdrawRequestService.SettelWithdrawRequest(Data);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const SettelWithdrawSlice = createSlice({
  name: "SettelWithdrawRequest",
  initialState,
  reducers: {
    reset: (state) => {
      state.SetteisLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.Settelmessage = "";
      state.SettelWithdrawRequestData = [];
      state.Success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SettelWithdrawRequest.pending, (state) => {
        state.SetteisLoading = true;
      })
      .addCase(SettelWithdrawRequest.fulfilled, (state, action) => {
        state.SetteisLoading = false;
        state.isSuccess = true;
        state.Settelmessage = action.payload.message;
        state.Success = action.payload.success;
      })
      .addCase(SettelWithdrawRequest.rejected, (state, action) => {
        state.SetteisLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.Settelmessage = action.payload;
      });
  },
});

export const { reset } = SettelWithdrawSlice.actions;

export default SettelWithdrawSlice.reducer;
