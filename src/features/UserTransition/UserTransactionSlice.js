import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserTransactionService } from "./UserTransactionService";

const initialState = {
  AllUserTransaction: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  success:1

};
const UserTransactionSlice = createSlice({
  name: "UserTransaction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = ""
      state.AllUserTransaction = [];
    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.AllUserTransaction = action.payload.data;
        state.message = action.payload.message;
        state.success=action.payload.success
     
      })
      .addCase(GetAllUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const GetAllUserTransactions = createAsyncThunk("get/UserTransaction", async (Id, thunkAPI) => {

    try {
     
      return await UserTransactionService.GetAllUserTransactions(Id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = UserTransactionSlice.actions;

export default UserTransactionSlice.reducer;
