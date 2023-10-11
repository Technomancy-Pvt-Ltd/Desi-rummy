import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import usersReducer from '../features/userlist/usersSlice'
import UserTransactionReducer from "../features/UserTransition/UserTransactionSlice"
import getWithdrawRequestsReducer from "../features/GetWithdrawRequests/getWithdrawRequestsSlice"
import SettelWithdrawRequestReducer from "../features/settelWithdrawRequest/SettelWithdrawSlice"
import PayoutListsReducer from "../features/PayoutList/PayoutListSlice"
import PayInListsReducer from "../features/PayInList/PayInListSlice"
const store=configureStore({
    reducer: {
        auth : authReducer,
        Users: usersReducer,
        AllTransaction: UserTransactionReducer,
        AllWithdrawRequests: getWithdrawRequestsReducer,
        SettelWithdrawRequest: SettelWithdrawRequestReducer,
        PayoutList: PayoutListsReducer,
        PayInList:PayInListsReducer
    }
})

export default store