import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user/userSlice";
import {contactsReducer} from "./reducers/contacts/contactSlice";
import {deletedContactsReducer} from "./reducers/deletedContacts/deletedContactsSlice";

const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactsReducer,
    deletedContacts: deletedContactsReducer
})

export const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch