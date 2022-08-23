import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface userSlice {
    isAuth: boolean
    user: IUser
    error: string
    isLoading: boolean
}

const initialState: userSlice = {
    isAuth: false,
    user: {} as IUser,
    error: '',
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true
        },
        userFetchingSuccess(state, action: PayloadAction<IUser>) {
            state.isAuth = true
            state.error = ''
            state.user = action.payload
            state.isLoading = false
        },
        userLogout(state) {
            state.user = {} as IUser
            state.error = ''
            state.isAuth = false
            state.isLoading = false
        }
        ,
        userFetchingError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const {userLogout,userFetching, userFetchingSuccess, userFetchingError} = userSlice.actions
export const userReducer = userSlice.reducer