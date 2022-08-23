import {IUser} from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ContactSlice {
    contacts: IUser[]
    isLoading: boolean
    error: string
}

const initialState: ContactSlice = {
    contacts: [] as IUser[],
    isLoading: false,
    error: ''
}

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: initialState,
    reducers: {
        contactsFetching(state) {
            state.isLoading = true
        },
        contactsFetchingSuccess(state, action: PayloadAction<IUser[]>){
            state.error = ''
            state.contacts = action.payload
            state.isLoading = false
        },
        contactsFetchingError(state, action: PayloadAction<string>){
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const {contactsFetching, contactsFetchingSuccess, contactsFetchingError} = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer