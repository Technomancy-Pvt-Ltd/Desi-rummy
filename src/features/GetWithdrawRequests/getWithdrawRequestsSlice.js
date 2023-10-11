import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithdrawRequestsService } from "./getWithdrawRequestsService";

const initialState = {
  AllWithdrawRequests: [],
  WisLoading: false,
  WisError: false,
  WisSuccess: false,
  Wmessage: "",
  Wstatus: null,
};
const getWithdrawRequestsSlice = createSlice({
  name: "UserTransaction",
  initialState,
  reducers: {
    Wreset: (state) => {
      state.WisLoading = false;
      state.WisError = false;
      state.WisSuccess = false;
      state.Wmessage = "";
      state.AllWithdrawRequests = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllWithdrawRequests.pending, (state) => {
        state.WisLoading = true;
      })
      .addCase(GetAllWithdrawRequests.fulfilled, (state, action) => {
        state.WisLoading = false;
        state.WisSuccess = true;
        state.AllWithdrawRequests = action.payload.data;
        state.Wmessage = action.payload.message;
        state.Wstatus = action.payload.success;
      })
      .addCase(GetAllWithdrawRequests.rejected, (state, action) => {
        state.WisLoading = false;
        state.WisSuccess = false;
        state.WisError = true;
        state.Wmessage = action.payload;
      });
  },
});
export const GetAllWithdrawRequests = createAsyncThunk(
  "get/WithdrawRequest",
  async (Id, thunkAPI) => {
    try {
      return await getWithdrawRequestsService.GetAllWithdrawRequests(Id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { Wreset } = getWithdrawRequestsSlice.actions;

export default getWithdrawRequestsSlice.reducer;
