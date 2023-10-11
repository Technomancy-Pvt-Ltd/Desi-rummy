import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  users: [],
  status: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
//   reducers: {
//     reset: (state) => initialState,
//   },
  extraReducers: (builder) => {
    builder
      .addCase(GetUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
        state.status = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(GetUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const GetUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      return await usersService.GetUsers();
    } catch (error) {

      const message =
        (error.msg && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
