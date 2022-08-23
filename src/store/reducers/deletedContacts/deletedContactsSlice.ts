import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface deletedContacts {
    deletedContacts: IUser[]
    isLoading: boolean
    error: string
}

const initialState: deletedContacts = {
    deletedContacts: [] as IUser[],
    isLoading: false,
    error: ''
}

export const deletedContactsSlice = createSlice({
    name: "deletedContacts",
    initialState: initialState,
    reducers: {
        deletedContactsFetching(state) {
            state.isLoading = true
        },
        deletedContactsFetchingSuccess(state, action: PayloadAction<IUser[]>){
            state.error = ''
            state.deletedContacts = action.payload
            state.isLoading = false
        },
        deletedContactsFetchingError(state, action: PayloadAction<string>){
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const {deletedContactsFetching, deletedContactsFetchingSuccess, deletedContactsFetchingError} = deletedContactsSlice.actions
export const deletedContactsReducer = deletedContactsSlice.reducer